let express = require("express");
let router = express.Router();
let passport = require("passport");
let path = require("path");

router.post(
  "/access",
  passport.authenticate("local", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "http://localhost:3000/access"
  })
);

module.exports = router;
