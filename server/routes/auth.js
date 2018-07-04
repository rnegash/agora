const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const db = require("../config/db.js");

router.get("/access", (req, res) => {
  if (req.isAuthenticated()) {
    console.log(`Welcome back ${req.user.alias}`);
    res.send(`Welcome back ${req.user}`);
  } else {
    res.send("Hello world!");
  }
});

// router.post(
//   "/access",
//   passport.authenticate("local", {
//     successRedirect: "http://localhost:3000/",
//     failureRedirect: "http://localhost:3000/access"
//   })
// );

router.post("/access", function(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user
      });
    }

    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }

      // generate a signed son web token with the contents of user object and return it in the response

      const token = jwt.sign(user, "your_jwt_secret");
      console.log("token\n", token);
      return res.json({ user, token });
    });
  })(req, res);
});

router.get("/logout", function(req, res) {
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
