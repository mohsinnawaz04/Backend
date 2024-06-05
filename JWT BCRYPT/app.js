const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

const password = "Mohsin04";
const encryptedPass =
  "$2b$10$KhMjmaSXrDDG2pg5Lxl1LuXT6LpGFLJW2Xt1HjO74CtP.ZHqNN3nK";

app.get("/", (req, res) => {
  let token = jwt.sign({ email: "mohsin@test.com" }, "secret");
  console.log(token);

  let data = jwt.verify(token, "secret");
  res.send(data);
});

app.listen(3000);
