let express = require("express");
let api = express();
let bodyParser = require("body-parser");

let sqlite3 = require("sqlite3").verbose();

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

let db = new sqlite3.Database(
  "./data/db.sqlite",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the agora SQlite database.");
  }
);

db.serialize(() => {
  db.run("PRAGMA foreign_keys = ON;");
  db.run(
    "CREATE TABLE IF NOT EXISTS Challenge (id INTEGER PRIMARY KEY ASC, statement TEXT, author TEXT, date TEXT, question TEXT);"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY ASC, email TEXT, alias TEXT, password TEXT);"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS Response (id INTEGER PRIMARY KEY ASC, response TEXT, userId INTEGER, challengeId INTEGER, FOREIGN KEY(userId) REFERENCES User(id), FOREIGN KEY(challengeId) REFERENCES Challenge(id));"
  );
});

api.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

api.get("/data/response", function(req, res) {
  db.all("SELECT * FROM Response", function(err, rows) {
    //res.send(res);
    // rows.forEach(row => {
    //   console.log(row);
    // });
    res.send(rows);
  });
});

api.post("/data/response", function(req, res) {
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

api.listen(8080);
console.log("Submit GET or POST to http://localhost:8080/data");
