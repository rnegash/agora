const express = require("express");
const router = express.Router();
const passport = require("passport");
const db = require("../config/db.js");

router.get("/user", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  console.log("inside /user \n", req.user);

  let userId = req.user === undefined ? 0 : req.user.id;
  db.get("SELECT * FROM User WHERE id=?", userId, function(err, row) {
    if (err) {
      console.error(err.message);
    }
    console.error("inside /user \n", row);
    res.send(row);
  });
});

module.exports = router;
