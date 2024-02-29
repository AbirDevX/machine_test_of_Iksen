const express = require("express");
const {
  renderAdminDashBoardController,
  renderAdminSignInController,
  adminSignInController,
  adminLogOutController,
  renderAdminUsersController,
} = require("../../controllers/admin/adminController");
const { isAdmin } = require("../../middleware/auth/isAdmin");
const adminRoutes = express.Router();

adminRoutes.get("/dashboard", isAdmin, renderAdminDashBoardController);
adminRoutes.get("/users", isAdmin, renderAdminUsersController);

adminRoutes.get("/sign-in", renderAdminSignInController);
adminRoutes.post("/sign-in", adminSignInController);
adminRoutes.get("/logout", adminLogOutController);

module.exports = { adminRoutes };
