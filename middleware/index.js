var Campground = require("../models/campground");
var Comment    = require("../models/comment");

// All middleware here
var middlewareObj = {};

// ===== CAMPGROUND =====
middlewareObj.checkCampgroundOwnership = function(req, res, next){
// is user logged in?
if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground) {
            req.flash("error", "Campground not found");
            res.redirect("/campgrounds");
            } else {
             // does user own the campground?
            if(foundCampground.author.id.equals(req.user._id)) { //siempre validar que tipo de datos son
                next();
            } else {
                req.flash("error", "You dont have permission to do that");
                res.redirect("back");
            }
          }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

// ===== COMMENT =====
middlewareObj.checkCommentOwnership = function(req, res, next){
    // is user logged in?
if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err || !foundComment) {
            req.flash("error", "comment not found");
            res.redirect("/campgrounds");
            } else {
             // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) { //siempre validar que tipo de datos son
                next();
            } else {
                req.flash("error", "You dont have permission to do that");
                res.redirect("back");
            }
          }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

// ===== LOGGED IN =====
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;