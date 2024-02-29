const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const { HttpException } = require("../../config/httpExaption");

async function isAuthorized(req, res, next) {
  try {
    const authorizationHeader = req.headers?.authorization;

    if (!authorizationHeader) {
      throw new HttpException(StatusCodes.BAD_REQUEST, "Bad Request..!");
    }
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.USER_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "UNAUTHORIZED..!" });
      }
      req.user = decoded;
      return next();
    });
  } catch (error) {
    console.log("From isAuthorized middleware:", error?.message);

    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || "Internal Server Error..!";

    return res.status(status).json({ message });
  }
}

module.exports = { isAuthorized };
