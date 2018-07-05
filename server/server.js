const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
const cookieParser = require("cookie-parser");
const sqlite3 = require("sqlite3").verbose();
const morgan = require("morgan");

const passport = require("passport");
const session = require("express-session");

const cors = require("./config/cors.js");
const db = require("./config/db.js");
// TODO: make sure db config is loaded and db is created if there is none
const apiRoutes = require("./routes/api.js");
const authRoutes = require("./routes/auth.js");
const user = require("./routes/user");

require("./config/passport.js");

app.use(morgan("dev"));
app.use(cookieParser("secret"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors);

// TODO: hide secret
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

// app.use(
//   "/api/user",
//   passport.authenticate("jwt", function(err, user, info) {
//     console.log("going into /user \n", err, user, info);
//   }),
//   function(req, res, next) {
//     console.log("going into /user \nsend\n", err, user, info);
//
//     res.send(req.user);
//   }
// );

app.use(authRoutes);
app.use(apiRoutes);

app.use(user);

app.listen(8080);
console.log("Submit to http://localhost:8080/");
