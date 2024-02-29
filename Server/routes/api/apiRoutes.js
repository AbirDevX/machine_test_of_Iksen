const express = require("express");
const {
  signInController,
  signUpController,
} = require("../../controllers/api/authController");
const {
  profileController,
  verifyUserController,
  userLogOutController,
} = require("../../controllers/api/userController");
const { isAuthorized } = require("../../middleware/auth/isAuthorized");

const apiRoutes = express.Router();

apiRoutes.post("/sign-in", signInController);
apiRoutes.post("/sign-up", signUpController);
apiRoutes.get("/profile/:id", isAuthorized, profileController);
apiRoutes.get("/verify", isAuthorized, verifyUserController);
apiRoutes.get("/logout", isAuthorized, userLogOutController);

module.exports = { apiRoutes };
