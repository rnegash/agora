const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const db = require("./db.js");

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new localStrategy(function(username, password, done) {
    console.log(username);
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

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret"
    },
    function(jwtPayload, done) {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      console.log(jwtPayload, "jwtpayload");
      let id = jwtPayload.id;
      db.get("SELECT * from User WHERE id = ?", id, function(err, row) {
        if (!row) {
          return done(null, false);
        } else {
          console.log("selected user based in jwtpayload \n", row);
          return done(null, row);
        }
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  console.log("serialize", user.id);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.get("SELECT * FROM User WHERE id = ?", id, function(err, row) {
    if (!row) {
      return done(null, false);
    } else {
      done(null, row);
    }
  });
});
