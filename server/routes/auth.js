const express = require("express");
const router = express.Router();
const passport = require("passport");
const path = require("path");
const db = require("../config/db.js");

router.post(
  "/access",
  passport.authenticate("local", {
    successRedirect: "http://localhost:3000/good",
    failureRedirect: "http://localhost:3000/bad",
    failureFlash: true
  })
);
router.get("/access", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Welcome back, ${req.user.username}!`);
  } else {
    res.send(`Hello World!, ${req}`);
  }
});
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/access");
});

router.post("/register", function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let alias = req.body.username.slice(0, username.indexOf("@"));

  db.run(
    "INSERT INTO User (id, email, alias, password) VALUES(?, ?, ?, ?);",
    [null, username, alias, password],
    function(err) {
      if (err) {
        return console.error(err.message);
      }
      res.send(`Registered user with email ${username}`);
    }
  );
});
module.exports = router;
