const express = require("express");
const router = express.Router();
const passport = require("passport");
const path = require("path");
const db = require("../config/db.js");

// set if to 0 if not logged in
router.get("/response", function(req, res) {
  let userId = req.user === undefined ? 0 : req.user.id;
  let challengeId = req.query.challengeId;
  if (userId === 0) {
    db.all(
      "SELECT * FROM Response WHERE challengeId=? ORDER BY id DESC",
      challengeId,
      function(err, rows) {
        if (err) {
          console.log(err);
        }
        res.send(rows);
      }
    );
  } else {
    db.all(
      "SELECT * FROM Response WHERE userId!=? AND challengeId=? ORDER BY id DESC",
      userId,
      challengeId,
      function(err, rows) {
        if (err) {
          console.log(err);
        }
        res.send(rows);
      }
    );
  }
});

router.get("/response/user", function(req, res) {
  let userId = req.user === undefined ? 0 : req.user.id;
  db.all(
    "SELECT * FROM Response WHERE userId=? ORDER BY id DESC",
    userId,
    function(err, rows) {
      if (err) {
        console.log(err);
      }
      res.send(rows);
    }
  );
});

router.get("/alias", function(req, res) {
  let userId = req.user === undefined ? 0 : req.user.id;
  db.get("SELECT alias FROM User WHERE id=?", userId, function(err, row) {
    if (err) {
      console.error(err.message);
    }
    res.send(row);
  });
});

router.get("/challenge", function(req, res) {
  let challengeId = req.query.challengeId;
  db.get("SELECT * FROM Challenge WHERE id=?", challengeId, function(err, row) {
    if (err) {
      console.error(err.message);
    }
    res.send(row);
  });
});

router.post("/response", function(req, res) {
  let userResponse = req.body.response;
  let userId = req.user === undefined ? 0 : req.user.id;
  let challengeId = req.body.challengeId;
  db.run(
    "INSERT INTO Response(id, response, userId, challengeId) VALUES (?, ?, ?, ?);",
    [null, userResponse, userId, challengeId],
    function(err) {
      if (err) {
        console.error(err.message);
      }
      res.send(`posted response ${userResponse} ${userId} ${challengeId}`);
    }
  );
  //db.close();
});
module.exports = router;
