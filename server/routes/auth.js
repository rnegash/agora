let express = require("express");
let router = express.Router();
let passport = require("passport");
let path = require("path");
let db = require("../config/db.js");

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Welcome back, ${req.user.username}!`);
  } else {
    res.send("Hello World!");
  }
});

router.post(
  "/access",
  passport.authenticate("local", {
    successRedirect: "/me",
    failureRedirect: "http://localhost:3000/bad",
    failureFlash: true
  })
);

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
      console.log(`Rows inserted ${this.changes}`);
      res.send(`Registered user with email ${username}`);
    }
  );
});
module.exports = router;
