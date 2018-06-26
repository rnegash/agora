const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
const cookieParser = require("cookie-parser");
const sqlite3 = require("sqlite3").verbose();
const morgan = require("morgan");

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const session = require("express-session");

const cors = require("./config/cors.js");
const db = require("./config/db.js");
const authRoutes = require("./routes/auth.js");
const apiRoutes = require("./routes/api.js");

require("./config/passport.js");

app.use(morgan("dev"));
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

app.use(authRoutes);

app.listen(8080);
console.log("Submit to http://localhost:8080/");
