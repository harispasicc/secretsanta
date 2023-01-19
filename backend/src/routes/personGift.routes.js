import express from "express";
import passport from 'passport'
import giftCtrl from "../controllers/personGift.controller";
import personCtrl from '../controllers/person.controller';
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.route("/api/people/:personId/gifts")
    .get(passport.authenticate("jwt", { session: false }),giftCtrl.list)
    .post(passport.authenticate("jwt", { session: false }),giftCtrl.create);

router.route("/api/people/:personId/gifts/:giftId")
    .get(passport.authenticate("jwt", { session: false }),giftCtrl.giftById)
    .put(passport.authenticate("jwt", { session: false }),giftCtrl.edit)
.delete(passport.authenticate("jwt", { session: false }),giftCtrl.remove)
    
router.param('personId', personCtrl.personById)

export default router;
