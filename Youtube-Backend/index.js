const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    res.render("index", { files: files });
  });
});

app.get("/file/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedData) => {
    res.render("show", {
      filename: req.params.filename,
      filedata: filedData,
    });
  });
});

app.get("/edit/:filename", (req, res) => {
  res.render("edit", { fileName: req.params.filename });
});

app.post("/edit", (req, res) => {
  fs.rename(
    `./files/${req.body.previous}`,
    `./files/${req.body.new}.txt`,
    (err) => {
      res.redirect("/");
    }
  );
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    (err) => {
      console.log(err);
    }
  );
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log("server is up & running!");
});
