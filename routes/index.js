var express    = require("express");
var router     = express.Router();
var passport   = require("passport");
var User       = require("../models/user");

// Root Route
router.get("/", function(req, res){
    res.render("landing");
});

// ============
// AUTH ROUTES
// ============

// Show register Form
router.get("/register", function(req, res){
    res.render("register");
});

// handle up sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//Show Login Form
router.get("/login", function(req, res){
    res.render("login");
});

// handling login logic
// app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local", 
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }), function(req, res){
});

// add logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});

module.exports = router;