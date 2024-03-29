const { StatusCodes } = require("http-status-codes");
const { MulterError } = require("multer");

const notFoundHandler = (req, res) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({
      message: "The requested resource could not be found on this server.",
      status: StatusCodes.NOT_FOUND,
    });
};

const defaultErrorHandler = (error, req, res, next) => {
  if (error) {
    if (error instanceof MulterError) {
      console.log("....multer Error.....");
      console.log(error);
      return res.status(StatusCodes.BAD_REQUEST).send(error.message);
    }
    console.log(error?.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

module.exports = { notFoundHandler, defaultErrorHandler };
