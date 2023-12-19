const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:5173";

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
        });
    }
    else {
        res.status(401).json({
            success: false,
            message: "login first"
        })
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
});



router.get("/github", passport.authenticate("github", { scope: ["profile", "repo"] }));

router.get(
    "/github/callback",
    passport.authenticate("github", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);


module.exports = router