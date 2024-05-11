const session = require("express-session");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const dotenv = require("dotenv")
dotenv.config({ path: './config.env' })
const GithubStrategy = require("passport-github2").Strategy;


const authRoute = require("./routes/auth");
const githubRoute = require("./routes/github");
const app = express();

const id = process.env.GITHUB_CLIENT_ID
const secret = process.env.GITHUB_CLIENT_SECRET


app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);

passport.use(
    new GithubStrategy(
        {
            clientID: id,
            clientSecret: secret,
            callbackURL: "/auth/github/callback",
        },
        function (accessToken, refreshToken, profile, done) {
            profile.accessToken = accessToken;
            done(null, profile);
        }
    )
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);




passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});



app.use("/auth", authRoute);
app.use("/github", githubRoute);
const port = process.env.PORT
app.listen(port, () => {
    console.log("Server is running!");
});
