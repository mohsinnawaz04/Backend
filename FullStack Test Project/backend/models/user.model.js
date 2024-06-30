const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    cPassword: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
