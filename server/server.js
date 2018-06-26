let express = require("express");
let api = express();
let bodyParser = require("body-parser");
let router = express.Router();
const cookieParser = require("cookie-parser");
let sqlite3 = require("sqlite3").verbose();

let passport = require("passport");
let localStrategy = require("passport-local").Strategy;
let session = require("express-session");

let cors = require("./config/cors.js");
let db = require("./config/db.js");
let authRoutes = require("./routes/auth.js");
let apiRoutes = require("./routes/api.js");

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());
api.use(cookieParser());
api.use(cors);

api.use(apiRoutes);

api.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false
    }
  })
);

api.use(passport.initialize());
api.use(passport.session());
require("./config/passport.js");

api.use(authRoutes);

api.listen(8080);
console.log("Submit to http://localhost:8080/");
