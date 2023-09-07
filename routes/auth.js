const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportSerilize = require('../passport/index')

passportSerilize()

router.get("/",(req, res) => {
    console.log(req.user);
    if (!req.user) return res.redirect("/login");
    res.render("main", { user: req.user });
});


router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login",passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
    })
);

// google login 화면
router.get("/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);

// google login 성공과 실패 리다이렉트
router.get("/auth/google/callback",passport.authenticate("google", {
        successRedirect: "/",
        failureRedirect: "/login",
    })
);

module.exports = router