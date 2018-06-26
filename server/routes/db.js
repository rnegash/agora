let express = require("express");
let router = express.Router();
let passport = require("passport");
let path = require("path");
let db = require("../config/db.js");

router.get("/response", function(req, res) {
  let userId = req.query.userId;
  let challengeId = req.query.challengeId;
  db.all(
    "SELECT * FROM Response WHERE userId!=? AND challengeId=? ORDER BY id DESC",
    userId,
    challengeId,
    function(err, rows) {
      //res.send(res);
      // rows.forEach(row => {
      //   console.log(row);
      // });
      res.send(rows);
    }
  );
});

router.get("/alias", function(req, res) {
  let userId = req.query.userId;
  db.get("SELECT alias FROM User WHERE id=?", userId, function(err, row) {
    if (err) {
      return console.error(err.message);
    }
    res.send(row);
  });
});

router.get("/challenge", function(req, res) {
  let challengeId = req.query.challengeId;
  db.get("SELECT * FROM Challenge WHERE id=?", challengeId, function(err, row) {
    if (err) {
      return console.error(err.message);
    }
    res.send(row);
  });
});

router.post("/response", function(req, res) {
  let userResponse = req.body.response;
  let challengeId = req.body.challengeId;
  db.run(
    "INSERT INTO Response(id, response, userId, challengeId) VALUES (?, ?, ?, ?);",
    [null, userResponse, 1, challengeId],
    function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Rows inserted ${this.changes}`);
      res.send("posted response");
    }
  );
  //db.close();
});
module.exports = router;
