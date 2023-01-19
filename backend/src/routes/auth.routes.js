import express from "express";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.route("/api/users/login").post(authCtrl.signin);
router.route("/api/users/logout").get(authCtrl.signout);

export default router;
