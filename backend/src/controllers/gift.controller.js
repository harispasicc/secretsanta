import Child from "../models/child.model";
import _ from "lodash";
import errorHandler from "../helpers/dbErrorHandler";

const create = (req, res, next) => {
    const childId = req.params.childId;
    const gift = req.body;
    Child.findOne({ _id: childId }).exec((err, child) => {
        if (err || !child) {
            return res.json({ error: "Child not found!" });
        }
        if (!req.body) {
            return res.json({ error: 'You need to enter name of gift' });
        }
        (child.gifts).push(gift);
        child.save(err => {
            if (err) {
                return res.json({ error: errorHandler.getErrorMessage(err) });
            }
            res.status(200).json({ child, message: "Successfully added a new gift." });
        })
    })
};
const list = (req, res) => {
    const child = req.child;
    res.status(200).json(child.gifts);
};

const giftById = (req, res) => {
    const giftId = req.params.giftId;
    const child = req.child;
    const gift = child.gifts.id(giftId);
    res.status(200).json(gift);
};

const edit = (req, res, next) => {
    let child = req.child;
    if (!req.body.name) {
        return res.json({ error: 'You need to enter gift name' })
    }
    const giftId = req.params.giftId;
    child.gifts.id(giftId).name = req.body.name;
    child.save((err) => {
        if (err) {
            return res.json({ error: errorHandler.getErrorMessage(err) });
        }
        res.status(200).json({message:'Gift name successfully renamed'});
    });
};
const remove = (req, res, next) => {
    const giftId = req.params.giftId;
    const child = req.child;
    child.gifts.id(giftId).remove();
    child.save((err) => {
        if (err) {
            return res.json({ error: errorHandler.getErrorMessage(err) });
        }
        res.status(200).json({message:'Gift successfully removed.'});
    });
};

export default { create, list, giftById, edit, remove };
