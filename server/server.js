let express = require("express");
let api = express();
let bodyParser = require("body-parser");
let router = express.Router();

let sqlite3 = require("sqlite3").verbose();

let passport = require("passport");
let localStrategy = require("passport-local").Strategy;
let session = require("express-session");
//let access = require("./routes/access.js");

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
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

api.get("/response", function(req, res) {
  db.all("SELECT * FROM Response ORDER BY id DESC", function(err, rows) {
    //res.send(res);
    // rows.forEach(row => {
    //   console.log(row);
    // });
    res.send(rows);
  });
});

api.post("/response", function(req, res) {
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

// Auth

api.use(passport.initialize());
api.use(
  passport.session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

passport.use(
  new localStrategy(function(username, password, done) {
    console.log(username);
    console.log(password);
    db.get(
      "SELECT * from User WHERE email = ? AND password = ?",
      username,
      password,
      function(err, row) {
        if (!row) {
          console.log("no user");
          return done(null, false);
        } else {
          console.log("should login", row);
          return done(null, row);
        }
      }
    );
  })
);

passport.serializeUser(function(user, done) {
  console.log("called serializeUser");

  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("called deserializeUser");
  db.get("SELECT, id, email FROM User WHERE id = ?", id, function(err, row) {
    if (!row) {
      return done(null, false);
    } else {
      done(null, row);
    }
  });
});

api.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Welcome back, ${req.user.username}!`);
  } else {
    res.send("Hello World!");
  }
});
api.post(
  "/access",
  passport.authenticate("local", {
    successRedirect: "http://localhost:3000/good",
    failureRedirect: "http://localhost:3000/bad"
  })
);
//api.use("/access", router);
api.get("/ping", function(req, res) {
  res.status(200).send("pong!");
});
api.listen(8080);
console.log("Submit GET or POST to http://localhost:8080/");
