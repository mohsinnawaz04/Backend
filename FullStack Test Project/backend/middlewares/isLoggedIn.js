const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  let token = req.cookies.token;

  if (token === "" || token === undefined)
    res.send("you must be logged in first!");
  else {
    let data = jwt.verify(token, process.env.JWT_KEY);
    req.user = data;
    next();
  }
};

module.exports = isLoggedIn;
