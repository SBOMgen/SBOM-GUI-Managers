const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth");
const app = express();

app.use(express.json());
app.use(dotenv.config({ path: "./config.env" }));

app.use(
  cookieSession({ name: "session", keys: ["cdDev"], maxAge: 24 * 60 * 60 * 100 })
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

app.use("/auth", authRoute);

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port} !`);
});
