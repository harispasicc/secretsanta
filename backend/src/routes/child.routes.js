import express from "express";
import passport from "passport";
import childCtrl from "../controllers/child.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.route("/api/children")
    .get(passport.authenticate("jwt", { session: false }),childCtrl.list)
    .post(passport.authenticate("jwt", { session: false }),childCtrl.create);

router.route("/api/children/:childId")
    .get(passport.authenticate("jwt", { session: false }),childCtrl.read)
    .put(passport.authenticate("jwt", { session: false }),childCtrl.editChild)
.delete(passport.authenticate("jwt", { session: false }),childCtrl.removeChild)
    
router.param('childId', childCtrl.childById)
export default router;
