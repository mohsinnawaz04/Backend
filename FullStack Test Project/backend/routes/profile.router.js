const express = require("express");
const userModel = require("../models/user.model");
const router = express.Router();

router.get("/", async (req, res) => {
  let { email } = req.user;
  let user = await userModel.findOne({ email: email });
  console.log(user);
  res.send("HMM! profile route working");
});

module.exports = router;
