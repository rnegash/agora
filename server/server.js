let express = require("express");
let api = express();
let bodyParser = require("body-parser");
let router = express.Router();

let sqlite3 = require("sqlite3").verbose();

let passport = require("passport");
let localStrategy = require("passport-local").Strategy;
let session = require("express-session");
let access = require("./routes/access.js");
let db = require("./config/db.js");
let dbroutes = require("./routes/db.js");

require("./config/passport.js");

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

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

api.use(dbroutes);

api.use(passport.initialize());
api.use(
  passport.session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);
api.use(passport.session());
api.use(access);

api.listen(8080);
console.log("Submit GET or POST to http://localhost:8080/");
