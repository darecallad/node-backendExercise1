const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Home page");
});

module.export = router;