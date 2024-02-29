const { StatusCodes } = require("http-status-codes");
const niv = require("node-input-validator");
const { HttpException } = require("../../config/httpExaption");
const { UserModel } = require("../../models/userModel");
const { generateHash, compareHash } = require("../../services/hash.service");
const { generateToken } = require("../../services/token.service");
const { UserDto } = require("../../dto/userDto");
const { ROLE } = require("../../config/enum");
const mongoose = require("mongoose");
const TokenModel = require("../../models/tokenModel");

const signUpController = async (req, res) => {
  const payload = req?.body;
  try {
    const validationRules = {
      name: "required|string|minLength:3",
      userName: "required|string|minLength:3|uniqueUserName:User,userName",
      email: "required|email|unique:User,email",
      mobile: "required|string|validNo|uniqueNo:User,mobile",
      password: "required|string|minLength:6",
    };

    // Extend Validation of NIV(node-input-validator)
    niv.extend("unique", async ({ value, args }) => {
      const field = args[1] || "email";

      let condition = {};

      condition[field] = value;

      let emailExist = await mongoose.model(args[0]).findOne(condition);

      // email already exists
      if (emailExist) {
        return false;
      }
      return true;
    });
    niv.extend("validNo", async ({ value }) => {
      if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(value)) {
        return false;
      }
      return true;
    });
    niv.extend("uniqueNo", async ({ value, args }) => {
      const field = args[1] || "mobile";

      let condition = {};

      condition[field] = value;

      let mobileNOExist = await mongoose.model(args[0]).findOne(condition);

      // email already exists
      if (mobileNOExist) {
        return false;
      }
      return true;
    });
    niv.extend("uniqueUserName", async ({ value, args }) => {
      const field = args[1] || "userName";

      let condition = {};

      condition[field] = value;

      let userNameIsExist = await mongoose.model(args[0]).findOne(condition);

      // email already exists
      if (userNameIsExist) {
        return false;
      }
      return true;
    });
    // Extend messages of NIV(node-input-validator)
    const validationMessages = {
      en: {
        validNo: "Invalid mobile No..!",
        uniqueNo: "Mobile number already exist..!",
        uniqueUserName: "UserName already used..!",
      },
    };
    niv.extendMessages(validationMessages.en, "en");

    // check validation
    const v = new niv.Validator(payload, validationRules);
    const match = await v.check();
    if (!match)
      throw new HttpException(StatusCodes.BAD_REQUEST, "BAD_REQUEST", v.errors);
    // hashing password
    const hashPw = await generateHash(payload.password);
    const newUser = new UserModel({ ...payload, password: hashPw });
    // save to DB
    await newUser.save();
    const message = "Your Sign-Up Process SuccessFull.";
    // sending response
    return res.status(StatusCodes.CREATED).json({ message });
  } catch (error) {
    const status = error?.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error?.message || "INTERNAL_SERVER_ERROR";
    const errorObj = error?.errorObj || null;
    return res.status(status).json({ errors: errorObj, message });
  }
};

const signInController = async (req, res) => {
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
    if (!user || user.role !== ROLE.USER)
      throw new HttpException(StatusCodes.BAD_REQUEST, "User Not Found..!");
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
      process.env.USER_SECRET
    );
    await new TokenModel({ userId: user._id, accessToken: accessToken }).save();
    // Calculate the expiration time for 1 hour from now
    const expirationTime = new Date(Date.now() + 3600000); // 3600000 milliseconds = 1 hour

    // Set the cookie with max-age attribute
    res.cookie("user_accessToken", accessToken, {
      maxAge: 3600000, // 1 hour in milliseconds
      expires: expirationTime, // Optional: Sets the cookie expiration time as well
      httpOnly: true,
    });
    // sending response to client
    return res
      .status(StatusCodes.OK)
      .json({ message: "OK", accessToken, user: new UserDto(user) });
  } catch (error) {
    console.log(error);
    const status = error?.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error?.message || "INTERNAL_SERVER_ERROR";
    const errorObj = error?.errorObj || null;
    return res.status(status).json({ errors: errorObj, message });
  }
};

module.exports = { signInController, signUpController };
