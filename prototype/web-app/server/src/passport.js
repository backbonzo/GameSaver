const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;

const User = require('./models/User');

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.access_token;
  }
  return token;
};

// Authorization middelware, protect resources and endpoints
passport.use(new JwtStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: 'GarbageManagement',
},
(payload, done) => {
  // payload is data that we set inside token
  User.findById({ _id: payload.sub }, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
}));

// Authentication local strategy using username and password
passport.use(new LocalStrategy((username, password, done) => {
  // Query the DB to check if the user exist
  User.findOne({ username }, (err, user) => {
    if (err) {
      return done(err);
    }
    // if no user exist return done = false
    if (!user) {
      return done(null, false);
    }
    // found user now check if password is correct
    const comparedPass = user.comparePassword(password, done);
    return comparedPass;
  });
}));
