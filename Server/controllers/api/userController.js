const { StatusCodes } = require("http-status-codes");
const { UserModel } = require("../../models/userModel");
const { UserDto } = require("../../dto/userDto");
const TokenModel = require("../../models/tokenModel");

const profileController = async (req, res) => {
  const userId = req?.params?.id;
  const decodedUser = req?.user;
  try {
    const user = await UserModel.findById(userId);
    // sending response to client
    return res
      .status(StatusCodes.OK)
      .json({ message: "OK", user: new UserDto(user) });
  } catch (error) {
    console.log(error);
    const status = error?.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error?.message || "INTERNAL_SERVER_ERROR";
    const errorObj = error?.errorObj || null;
    return res.status(status).json({ errors: errorObj, message });
  }
};
const verifyUserController = async (req, res) => {
  const decodedUser = req?.user;
  try {
    const token = await TokenModel.findOne({
      userId: decodedUser?._id,
    }).populate("userId");
    // sending response to client
    return res.status(StatusCodes.OK).json({
      message: "OK",
      user: new UserDto(token.userId),
      accessToken: token.accessToken,
    });
  } catch (error) {
    console.log(error);
    const status = error?.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error?.message || "INTERNAL_SERVER_ERROR";
    const errorObj = error?.errorObj || null;
    return res.status(status).json({ errors: errorObj, message });
  }
};
const userLogOutController = async (req, res) => {
  const user = req?.user;
  try {
    await TokenModel.findOneAndDelete({
      userId: user?._id,
    });
    res.clearCookie("user_accessToken");

    // sending response to client
    return res.status(StatusCodes.OK).json({
      message: "Logout SuccessFully.",
    });
  } catch (error) {
    console.log(error?.message);
    const status = error?.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error?.message || "INTERNAL_SERVER_ERROR";
    const errorObj = error?.errorObj || null;
    return res.status(status).json({ errors: errorObj, message });
  }
};

module.exports = {
  profileController,
  verifyUserController,
  userLogOutController,
};
