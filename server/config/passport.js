const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const db = require("./db.js");

passport.use(
  new localStrategy(function(username, password, done) {
    db.get(
      "SELECT * from User WHERE email = ? AND password = ?",
      username,
      password,
      function(err, row) {
        if (!row) {
          return done(null, false);
        } else {
          return done(null, row);
        }
      }
    );
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("deserializeUser id ", id);
  db.get("SELECT * FROM User WHERE id = ?", id, function(err, row) {
    if (!row) {
      return done(null, false);
    } else {
      done(null, row);
    }
  });
});
