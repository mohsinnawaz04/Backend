const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

// --Set dynamic Routes in express
app.get("/account/:username", (req, res) => {
  res.send(`Welcome Dear, ${req.params.username}`);
});

app.listen(PORT, () => {
  console.log("server up & running!");
});
