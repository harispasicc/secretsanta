import Person from "../models/person.model";
import User from '../models/user.model';
import _ from "lodash";
import errorHandler from "../helpers/dbErrorHandler";

const create = (req, res, next) => {
    const userId = req.body.userId;
    const person = new Person(req.body);
    User.findOne({ _id: userId }).exec((err, user) => {
        if (err || !user) {
            return res.json({ error: "User not found!" });
        }
        if (!req.body.fullName) {
            return res.json({ error: 'Name is required' });
        }
        (user.people).push(person);
        person.userId = userId;
        person.save((err, result) => {
            if (err) {
                return res.json({ error: errorHandler.getErrorMessage(err) });
            }
            user.save(err => {
                if (err) {
                    return res.json({ error: errorHandler.getErrorMessage(err) });
                }
                res.status(200).json({ result, message: "Successfully created a new person." });
            })

        });
    })
};
const list = (req, res) => {
    const userId = req.query.userId;
    Person.find({ userId: userId }, (err, persons) => {
        if (err) {
            return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
        }
        res.status(200).json(persons);
    });
};

const personById = (req, res, next, id) => {
    Person.findById(id).exec((err, person) => {
        if (err || !person) {
            return res.json({ error: "Person not found!" });
        }
        req.person = person;
        next();
    });
};
const read = (req, res) => {
    const person = req.person;
    res.status(200).json(person);
};

const editPerson = (req, res, next) => {
    let person = req.person;
    if (!req.body.fullName) {
        return res.json({error:'Name is required'})
    }
    person = _.extend(person, req.body);
    person.save((err) => {
        if (err) {
            return res.json({ error: errorHandler.getErrorMessage(err) });
        }
        res.status(200).json(person);
    });
};
const removePerson = (req, res, next) => {
    let person = req.person;
    User.findById(person.userId).exec((err, user) => {
        person.remove(err => {
            if (err) {
                return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
            }
            user.people.remove(req.person._id);
            user.save((err, result) => {
                if (err) {
                    return res.json({ error: errorHandler.getErrorMessage(err) });
                }
                res.status(200).json({ message: `${person.fullName} successfully deleted.`});
            })
        })
    })
};

export default { create, list, personById, read, editPerson, removePerson };
