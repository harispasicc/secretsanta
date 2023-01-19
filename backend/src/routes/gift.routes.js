import express from "express";
import passport from 'passport'
import giftCtrl from "../controllers/gift.controller";
import childCtrl from '../controllers/child.controller';

const router = express.Router();

router.route("/api/children/:childId/gifts")
    .get(passport.authenticate("jwt", { session: false }),giftCtrl.list)
    .post(passport.authenticate("jwt", { session: false }),giftCtrl.create);

router.route("/api/children/:childId/gifts/:giftId")
    .get(passport.authenticate("jwt", { session: false }),giftCtrl.giftById)
    .put(passport.authenticate("jwt", { session: false }),giftCtrl.edit)
.delete(passport.authenticate("jwt", { session: false }),giftCtrl.remove)
    
router.param('childId', childCtrl.childById)

export default router;
