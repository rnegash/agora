const express = require("express");
const router = express.Router();
const passport = require("passport");
const path = require("path");
const db = require("../config/db.js");

router.get("/", (req, res) => {
  console.log(req);

  if (req.isAuthenticated()) {
    res.send(`Welcome back, ${req.user.username}!`);
  } else {
    res.send("Hello World!");
  }
});

router.post(
  "/access",
  passport.authenticate("local", {
    successRedirect: "http://localhost:3000/good",
    failureRedirect: "http://localhost:3000/bad",
    failureFlash: true
  })
);

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("http://localhost:3000/");
});

router.get("/me", (req, res) => {
  console.log(req.user);
  res.send(req.user);
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
