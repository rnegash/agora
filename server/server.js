let express = require("express");
let restapi = express();

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
    "CREATE TABLE IF NOT EXISTS Challenge (id INTEGER PRIMARY KEY, statement TEXT, author TEXT, date TEXT, question TEXT);"
  );
});

db.close(err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Close the database connection.");
});
/*
db.serialize(function() {
  db.run(
    "CREATE TABLE Challenge (id INTEGER PRIMARY KEY ASC, statement TEXT, author TEXT, date TEXT, question TEXT);"
  );
  db.run(
    'INSERT INTO Challenge VALUES (1, "its the best", "me", "2018-01-01", "Is it really?")',
    "Challenge",
    0
  );
});*/
