const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes/index.router");
const usersRouter = require("./routes/user.router");
const profileRouter = require("./routes/profile.router");
const isLoggedIn = require("./middlewares/isLoggedIn");

require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(cors());

const db = require("./config/mongodb.config");
db();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/profile", isLoggedIn, profileRouter);

app.listen(PORT, () => {
  console.log("server is up & running at PORT " + PORT);
});
