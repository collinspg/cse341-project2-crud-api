const passport = require("passport");
const express = require('express');
const router = express.Router();

router.get('/login', passport.authenticate('github'), (req, res) =>{});

router.get('/logout', function (req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}); 

module.exports = router;