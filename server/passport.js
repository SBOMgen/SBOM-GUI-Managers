const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");

clientID = process.env.GITHUB_CLIENT_ID
clientSecret = process.env.GITHUB_CLIENT_SECRET;

passport.use(
  new GithubStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
