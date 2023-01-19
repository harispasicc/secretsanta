import express from "express";
import passport from "passport";
import personCtrl from "../controllers/person.controller";

const router = express.Router();

router.route("/api/people")
    .get(passport.authenticate("jwt", { session: false }),personCtrl.list)
    .post(passport.authenticate("jwt", { session: false }),personCtrl.create);

router.route("/api/people/:personId")
    .get(passport.authenticate("jwt", { session: false }),personCtrl.read)
    .put(passport.authenticate("jwt", { session: false }),personCtrl.editPerson)
.delete(passport.authenticate("jwt", { session: false }),personCtrl.removePerson)
    
router.param('personId', personCtrl.personById)
export default router;
