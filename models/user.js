const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  fullname: { type: String, unique: true, default: "" },
  email: { type: String, unique: true },
  password: { type: String, default: "" },
  userImage: { type: String, default: "/assets/images/default.png" },
  facebook: { type: String, default: "" },
  fbTokens: Array,
  google: { type: String, default: "" },
  googleTokens: Array,
});

userSchema.methods.encrypPassword = function (passport) {
  return bcrypt.hashSync(passport, bcrypt.genSaltSync(10), null);
};

userSchema.methods.decrypPassword = function (passport) {
  return bcrypt.hashSync(passport, bcrypt.genSaltSync(10), null);
};

module.exports = mongoose.model("User", userSchema);
