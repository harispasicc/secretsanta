import Person from "../models/person.model";
import _ from "lodash";
import errorHandler from "../helpers/dbErrorHandler";

const create = (req, res, next) => {
    const personId = req.params.personId;
    const gift = req.body;
    Person.findOne({ _id: personId }).exec((err, person) => {
        if (err || !person) {
            return res.json({ error: "Child not found!" });
        }
        if (!req.body) {
            return res.json({ error: 'You need to enter name of gift' });
        }
        (person.gifts).push(gift);
        person.save(err => {
            if (err) {
                return res.json({ error: errorHandler.getErrorMessage(err) });
            }
            res.status(200).json({ person, message: "Successfully added a new gift." });
        })
    })
};
const list = (req, res) => {
    const person = req.person;
    res.status(200).json(person.gifts);
};

const giftById = (req, res) => {
    const giftId = req.params.giftId;
    const person = req.person;
    const gift = person.gifts.id(giftId);
    res.status(200).json(gift);
};

const edit = (req, res, next) => {
    let person = req.person;
    if (!req.body.name) {
        return res.json({ error: 'You need to enter gift name' })
    }
    const giftId = req.params.giftId;
    person.gifts.id(giftId).name = req.body.name;
    person.save((err) => {
        if (err) {
            return res.json({ error: errorHandler.getErrorMessage(err) });
        }
        res.status(200).json({message:'Gift name successfully renamed'});
    });
};
const remove = (req, res, next) => {
    const giftId = req.params.giftId;
    const person = req.person;
    person.gifts.id(giftId).remove();
    person.save((err) => {
        if (err) {
            return res.json({ error: errorHandler.getErrorMessage(err) });
        }
        res.status(200).json({message:'Gift successfully removed.'});
    });
};

export default { create, list, giftById, edit, remove };
