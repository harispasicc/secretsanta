import express from "express";
import passport from "passport";

import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router
  .route("/api/users")
  .get(passport.authenticate("jwt", { session: false }), userCtrl.list);

router.route("/api/users/register").post(userCtrl.create);

router.route("/api/users/isAuthenticated").get(authCtrl.isAuthenticated);

router.route("/api/users/password").post(authCtrl.authenticatePassword);

router
  .route("/api/users/forgot-password")
  .post(userCtrl.createForgotPasswordUUID);

router.route("/api/users/reset-password").post(userCtrl.resetPassword);

router
  .route("/api/users/:userId")
  .get(passport.authenticate("jwt", { session: false }), userCtrl.read)
  .put(
    passport.authenticate("jwt", { session: false }),
    authCtrl.hasAuthorization,
    userCtrl.update
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    authCtrl.hasAuthorization,
    userCtrl.remove
  );

router.param("userId", userCtrl.userByID);

export default router;
