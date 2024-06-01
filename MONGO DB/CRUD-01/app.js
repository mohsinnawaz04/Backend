const express = require("express");
const app = express();

const PORT = 3000;

const userModel = require("./usermodel");

app.get("/", (req, res) => {
  res.send("HELLO WORLD!");
});

app.get("/create", async (req, res) => {
  let createdUser = await userModel.create({
    name: "mohsin",
    email: "mohsin@gmail.com",
    username: "mohsin04",
  });

  res.send(createdUser);

  console.log("hey");
});

app.get("/update", async (req, res) => {
  let updatedUser = await userModel.findOneAndUpdate(
    { username: "mohsin04" },
    { name: "Nawaz" },
    { new: true }
  );

  res.send(updatedUser);

  console.log("hey");
});

app.get("/read", async (req, res) => {
  let users = await userModel.find();

  res.send(users);
});

app.get("/delete", async (req, res) => {
  let deletedUser = await userModel.findOneAndDelete({ name: "Nawaz" });

  res.send(`${deletedUser} has been deleted!`);
});

app.listen(PORT);
