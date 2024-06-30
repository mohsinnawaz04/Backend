const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("HMM! working");
});

module.exports = router;
