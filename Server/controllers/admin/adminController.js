const { StatusCodes } = require("http-status-codes");
const niv = require("node-input-validator");

const { ROLE } = require("../../config/enum");
const { UserModel } = require("../../models/userModel");
const { compareHash } = require("../../services/hash.service");
const { HttpException } = require("../../config/httpExaption");
const { generateToken } = require("../../services/token.service");
const TokenModel = require("../../models/tokenModel");

const renderAdminDashBoardController = async (req, res) => {
  const admin = await UserModel.findById(req?.admin?._id);
  return res.render("pages/dashboard", {
    title: "Dashboard page",
    value: admin,
    error: "",
    url: req.url,
  });
};

const renderAdminUsersController = async (req, res) => {
  const admin = await UserModel.findById(req?.admin?._id);
  const users = await UserModel.find({ role: ROLE.USER });
  return res.render("pages/users", {
    title: "All Users",
    value: admin,
    users,
    error: "",
    url: req.url,
  });
};

const renderAdminSignInController = (req, res) => {
  if (req.cookies && req.cookies["admin_accessToken"]) {
    return res.redirect("/admin/dashboard");
  }
  return res.render("pages/signIn", {
    title: "Sign-In page",
    value: "",
    error: "",
    url: req.url,
  });
};
const adminSignInController = async (req, res) => {
  const payload = req?.body;

  try {
    const rules = {
      userName: "string|required",
      password: "string|required",
    };
    const v = new niv.Validator(payload, rules);
    const match = await v.check();
    if (!match)
      throw new HttpException(StatusCodes.BAD_REQUEST, "BAD_REQUEST", v.errors);
    const user = await UserModel.findOne({
      $or: [
        { email: payload.userName },
        { mobile: payload.userName },
        { userName: payload.userName },
      ],
    });
    if (!user || user.role !== ROLE.ADMIN)
      throw new HttpException(StatusCodes.BAD_REQUEST, "Admin Not Found..!");
    // check valid password or not
    const isValidPw = await compareHash(payload.password, user.password);
    if (!isValidPw)
      throw new HttpException(StatusCodes.UNAUTHORIZED, "UNAUTHORIZED..!");
    const tokenPayload = {
      _id: user?._id,
      role: user.role,
      createdAT: user.createdAt,
      updatedAt: user.updatedAt,
    };
    // generate token payload
    const accessToken = await generateToken(
      tokenPayload,
      process.env.ADMIN_SECRET
    );
    // Calculate the expiration time for 1 hour from now
    const expirationTime = new Date(Date.now() + 3600000); // 3600000 milliseconds = 1 hour

    // Set the cookie with max-age attribute
    res.cookie("admin_accessToken", accessToken, {
      maxAge: 3600000, // 1 hour in milliseconds
      expires: expirationTime, // Optional: Sets the cookie expiration time as well
      httpOnly: true,
    });
    // sending response to client
    return res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
    return res.render("pages/signIn", {
      title: "Sign-In page",
      value: payload,
      error: error,
      url: req.url,
    });
  }
};
const adminLogOutController = async (req, res) => {
  const admin = req?.admin;
  try {
    await TokenModel.findOneAndDelete({
      userId: admin?._id,
    });
    res.clearCookie("admin_accessToken");

    // sending response to client
    return res.redirect("/admin/sign-in");
  } catch (error) {
    console.log(error?.message);
    return res.redirect("/admin/dashboard");
  }
};

module.exports = {
  renderAdminDashBoardController,
  renderAdminSignInController,
  adminSignInController,
  adminLogOutController,
  renderAdminUsersController,
};
