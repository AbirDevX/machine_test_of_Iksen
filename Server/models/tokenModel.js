const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    accessToken: { type: String, required: true },
  },
  { timestamps: true }
);

const TokenModel = mongoose.model("Token", TokenSchema);
module.exports = TokenModel;
