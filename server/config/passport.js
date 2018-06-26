const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const db = require("./db.js");

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
