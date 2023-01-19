import User from "../models/user.model";
import ForgotPassword from "../models/forgotPassword.model";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import errorHandler from "../helpers/dbErrorHandler";
import sendEmail from "../helpers/sendEmail";

const create = (req, res, next) => {
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
    res.status(200).json({ message: "Successfully created a new user." });
  });
};
const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
    res.status(200).json(users);
  }).select("name email updated created");
};
const userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: "User not found!" });
    }
    req.profile = user;
    next();
  });
};
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  res.status(200).json(req.profile);
};
const update = (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, req.body);
  user.updated = Date.now();
  user.save((err) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.status(200).json(user);
  });
};
const remove = (req, res, next) => {
  let user = req.profile;
  user.remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.clearCookie("jwt");
    res.status(200).json(deletedUser);
  });
};

const createForgotPasswordUUID = (req, res) => {
  const response = {};
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      ForgotPassword.deleteMany({ userId: user._id }).then((deleted) => {
        const newUUID = uuidv4();
        response.uuid = newUUID;
        const forgotPasswordUUID = new ForgotPassword({
          userId: user._id,
          uuid: newUUID,
        });
        forgotPasswordUUID.save((err, result) => {
          if (err) {
            console.log(err);
          }
          const resetUrl = `http://localhost:3000/reset-password/${newUUID}`;
          sendEmail(user.email, "Password Reset", resetUrl)
            .then((result) => {
              return res.status(200).json(response);
            })
            .catch((err) => {
              return res.status(200).json(response);
            });
        });
      });
    } else {
      res.status(200).json(response);
    }
  });
};

const resetPassword = (req, res) => {
  ForgotPassword.findOne({ uuid: req.body.uuid }, (err, forgotRecord) => {
    if (!forgotRecord) {
      return res.status(400).json({ error: "Link has expired" });
    }
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
    User.findById(forgotRecord.userId, (err, user) => {
      if (err) {
        return res
          .status(400)
          .json({ error: errorHandler.getErrorMessage(err) });
      }
      user = _.extend(user, { password: req.body.password });
      user.updated = Date.now();
      user.save((err) => {
        if (err) {
          return res
            .status(400)
            .json({ error: errorHandler.getErrorMessage(err) });
        }
        forgotRecord.remove();
        user.hashed_password = undefined;
        user.salt = undefined;
        res.status(200).json({ user: user, message: "success" });
      });
    });
  });
};

export default {
  create,
  list,
  userByID,
  read,
  update,
  remove,
  createForgotPasswordUUID,
  resetPassword,
};
