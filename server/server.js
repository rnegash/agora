let express = require("express");
let app = express();
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors);

app.use(apiRoutes);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport.js");

app.use(authRoutes);

app.listen(8080);
console.log("Submit to http://localhost:8080/");
