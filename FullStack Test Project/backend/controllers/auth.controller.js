const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    let { email, password, name } = req.body;

    let user = await userModel.findOne({ email: email });

    if (user) return res.status(401).send("Account already exists.");

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send("Error Occured at genSalt: ", err.message);
        let user = await userModel.create({
          email,
          password: hash,
          name,
        });

        let token = generateToken(user);
        res.cookie("token", token);

        res.send("user created successfully.");
      });
    });
  } catch (err) {
    res.send("EEEROR: ", err.message);
  }
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email: email });
  if (!user) return res.status(401).send("Invalid Credentials.");

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);

      res.send("Login Successful.");
    } else {
      res.send("Invalid Credentials.");
    }
  });
};

const logout = (req, res) => {
  res.cookie("token", "");
  console.log("you have been logged out!");
  res.redirect("/");
};

module.exports = {
  registerUser,
  loginUser,
  logout,
};
