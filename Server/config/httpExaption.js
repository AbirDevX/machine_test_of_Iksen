class HttpException extends Error {
  constructor(statusCode, message, errorObj = null) {
    super();
    this.message = message;
    this.status = statusCode;
    this.errorObj = errorObj;
  }
}

module.exports = { HttpException };
