const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: [
      {
        vill: { type: String },
        pin: { type: String },
        po: { type: String },
        ps: { type: String },
      },
    ],
    avatar: {
      type: String,
      get: (avatar) => `${process.env.SERVER_URL}/avatar/${avatar}`,
      default: "user.png",
    },
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: true },
  },
  { timestamps: true, toJSON: { getters: true } }
);

const UserModel = mongoose.model("User", UserSchema);
module.exports = { UserModel };
