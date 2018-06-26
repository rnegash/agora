const sqlite3 = require("sqlite3").verbose();
let connection = new sqlite3.Database(
  "./data/db.sqlite",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the agora SQlite database.");
  }
);

connection.serialize(() => {
  connection.run("PRAGMA foreign_keys = ON;");
  connection.run(
    "CREATE TABLE IF NOT EXISTS Challenge (id INTEGER PRIMARY KEY ASC, statement TEXT, author TEXT, date TEXT, question TEXT);"
  );
  connection.run(
    "CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY ASC, email TEXT, alias TEXT, password TEXT);"
  );
  connection.run(
    "CREATE TABLE IF NOT EXISTS Response (id INTEGER PRIMARY KEY ASC, response TEXT, userId INTEGER, challengeId INTEGER, FOREIGN KEY(userId) REFERENCES User(id), FOREIGN KEY(challengeId) REFERENCES Challenge(id));"
  );
});

module.exports = connection;
