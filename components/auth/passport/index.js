const passport = require('passport');
const LocalStrategy = require('passport-local');
const authService = require('../authService');

passport.use(new LocalStrategy({ usernameField: 'email' }, async function verify(username, password, cb) {
  var user = await authService.checkUserCredential(username, password);
  if (user) {
    return cb(null, user);
  }
  return cb(new Error('Incorrect email or password.'));
}));

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { user_Id: user.user_Id, fullname: user.fullname, email: user.email, address: user.address, phone: user.phone , avatar: user.avatar});
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

module.exports = passport;