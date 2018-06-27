const express = require("express");
const router = express.Router();
const passport = require("passport");
const db = require("../config/db.js");

router.get("/access", (req, res) => {
  if (req.isAuthenticated()) {
    console.log("Welcome back " + req.session.user);
    res.send("Welcome back " + req.user);
  } else {
    res.send("Hello world!");
  }
});

router.post(
  "/access",
  passport.authenticate("local", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "http://localhost:3000/bad"
  })
);

router.get("/logout", function(req, res) {
  //req.logout();
  //https://stackoverflow.com/questions/13758207/why-is-passportjs-in-node-not-removing-session-on-logout
  res.clearCookie("connect.sid");
  res.redirect("http://localhost:3000/");
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
