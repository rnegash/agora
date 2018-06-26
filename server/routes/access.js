let express = require("express");
let router = express.Router();
let passport = require("passport");
let path = require("path");

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
    successRedirect: "http://localhost:3000/good",
    failureRedirect: "http://localhost:3000/bad",
    failureFlash: true
  })
);

router.post("/register", function(req, res) {
  let username = req.body.username;
  let password = req.body.password;

  db.run(
    "INSERT INTO User (id, email, alias, password) VALUES(?, ?, ?, ?);",
    [null, username, username, password],
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
