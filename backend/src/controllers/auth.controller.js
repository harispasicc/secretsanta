import User from "../models/user.model";
import jwt from "jsonwebtoken";
import config from "../config/config";

const cookieValidPeriod = 12000000;
const cookieExpires = () => Date.now() + cookieValidPeriod;
const cookieSettings = {
  httpOnly: true,
  secure: false, //--> SET TO TRUE ON PRODUCTION
  maxAge: cookieValidPeriod,
  path: "/",
};

const signin = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: "User not found!" });
    }

    if (!user.authenticate(req.body.password)) {
      return res
        .status(400)
        .json({ error: "Email and password do not match!" });
    }

    const payload = {
      user: { _id: user._id, name: user.name, email: user.email },
      expire: cookieExpires(),
    };
    const token = jwt.sign(JSON.stringify(payload), config.secret);
    res.header("Access-Control-Allow-Credentials", true);
    res.cookie("jwt", token, cookieSettings);
    res.status(200).json({
      user: { _id: user._id, name: user.name, email: user.email },
    });
  });
};

const signout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "User signed out." });
};

export const updateCookie = (req, res) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
    let decoded = jwt.decode(token, { complete: true });
    let payload = decoded?.payload;
    if (payload.user && payload.expire) {
      payload.expire = cookieExpires();
      let newToken = jwt.sign(JSON.stringify(payload), config.secret);
      res.header("Access-Control-Allow-Credentials", true);
      res.cookie("jwt", newToken, cookieSettings);
    }
  }
};

const isAuthenticated = (req, res) => {
  let token = null;
  let retreavedUser = null;

  if (req && req.cookies) {
    token = req.cookies["jwt"];
    let decoded = jwt.decode(token, { complete: true });
    retreavedUser = decoded?.payload?.user;
  }
  if (retreavedUser?._id) {
    res.status(200).json({
      isAuthenticated: true,
      user: retreavedUser,
    });
  } else {
    res.status(200).json({
      authenticated: false,
      user: null,
    });
  }
};

const hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.user && req.profile._id == req.user.user._id;
  if (!authorized) return res.status(403).json("User is not authorized!");
  next();
};

const authenticatePassword = (req, res) => {
  const userId = req.body.userId;
  User.findOne({ _id: userId }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: "User not found!" });
    }
    if (!req.body.password) {
      return res.json({ error: "Enter a password" });
    }
    if (!user.authenticate(req.body.password)) {
      return res.json({ error: "Incorrect Password!" });
    }
    res.json({ message: 'Continue with Parental Mode' });
  })
}

export default {
  signin,
  signout,
  hasAuthorization,
  isAuthenticated,
  authenticatePassword
};
