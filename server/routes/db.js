let express = require("express");
let router = express.Router();
let passport = require("passport");
let path = require("path");
let db = require("../config/db.js");

router.get("/response", function(req, res) {
  db.all("SELECT * FROM Response ORDER BY id DESC", function(err, rows) {
    //res.send(res);
    // rows.forEach(row => {
    //   console.log(row);
    // });
    res.send(rows);
  });
});

router.post("/response", function(req, res) {
  let userResponse = req.body.response;
  db.run(
    "INSERT INTO Response(id, response, userID, challengeId) VALUES (?, ?, ?, ?);",
    [null, userResponse, 1, 1],
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
