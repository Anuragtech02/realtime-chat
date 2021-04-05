const express = require("express");
const router = express.Router();
const short = require("short-uuid");

router.get("/", (req, res) => {
  res.send("Server running");
});

module.exports = router;
