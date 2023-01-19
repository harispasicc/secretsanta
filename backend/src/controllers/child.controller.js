import Child from "../models/child.model";
import User from '../models/user.model';
import _ from "lodash";
import errorHandler from "../helpers/dbErrorHandler";

const create = (req, res, next) => {
    const parentId = req.body.parentId;
    const child = new Child(req.body);
    User.findOne({ _id: parentId }).exec((err, parent) => {
        if (err || !parent) {
            return res.json({ error: "User not found!" });
        }
        if (!req.body.name || !req.body.age) {
            return res.json({ error: 'All fields are required' });
        }
        (parent.children).push(child);
        child.parent = parentId;
        child.save((err, result) => {
            if (err) {
                return res.json({ error: errorHandler.getErrorMessage(err) });
            }
            parent.save(err => {
                if (err) {
                    return res.json({ error: errorHandler.getErrorMessage(err) });
                }
                res.status(200).json({ result, message: "Successfully created a new child." });
            })

        });
    })
};
const list = (req, res) => {
    const parentId = req.query.parentId;
    Child.find({ parent: parentId }, (err, children) => {
        if (err) {
            return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
        }
        res.status(200).json(children);
    });
};

const childById = (req, res, next, id) => {
    Child.findById(id).exec((err, child) => {
        if (err || !child) {
            return res.json({ error: "Child not found!" });
        }
        req.child = child;
        next();
    });
};
const read = (req, res) => {
    const child = req.child;
    res.status(200).json(child);
};

const editChild = (req, res, next) => {
    let child = req.child;
    if (!req.body.name || !req.body.age) {
        return res.json({error:'All fields are required'})
    }
    child = _.extend(child, req.body);
    child.save((err) => {
        if (err) {
            return res.json({ error: errorHandler.getErrorMessage(err) });
        }
        res.status(200).json(child);
    });
};
const removeChild = (req, res, next) => {
    let child = req.child;
    User.findById(child.parent).exec((err, parent) => {
        child.remove(err => {
            if (err) {
                return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
            }
            parent.children.remove(req.child._id);
            parent.save((err, result) => {
                if (err) {
                    return res.json({ error: errorHandler.getErrorMessage(err) });
                }
                res.status(200).json({ message: `${child.name} successfully deleted.`});
            })
        })
    })
};

export default { create, list, childById, read, editChild, removeChild };
