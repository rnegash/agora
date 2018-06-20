let express = require("express");
let api = express();

let sqlite3 = require("sqlite3").verbose();

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

api.get("/data", function(req, res) {
  db.get("SELECT * FROM Response", function(err, row) {
    res.json({ response: row });
  });
});

api.post("/data", function(req, res) {
  db.run(
    "INSERT INTO Response(id, response, userID, challengeId) VALUES (?, ?, ?, ?);",
    [null, "it was great", 1, 1],
    function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Rows inserted ${this.changes}`);
    }
  );
  db.close();
});

api.listen(8080);
console.log("Submit GET or POST to http://localhost:3000/data");
