var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// DISPLAY ALL CAMPGROUNDS
router.get("/", function(req, res){
    //Traer campgrounds de la base
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("ERROR AL TRAER DATOS DE LA DB");
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    })
});

// ADD NEW CAMPGROUND TO DB
router.post("/", middleware.isLoggedIn, function(req, res){
    var name  = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc  = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price: price, image: image, description: desc, author: author}
    //crear campground y guardarlo en la base
    Campground.create(newCampground, function(err, newCreated){
        if(err){
            console.log("ALGO SALIO MAL!");
        } else {
            //redirect a /campgrounds
            res.redirect("/campgrounds");
        }
    })
});

//Displays form to make a new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
})

// SHOW INFO ABOUT OINE CAMPGROUND
router.get("/:id", function(req, res){
    //find campground id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err || !foundCampground){
           req.flash("error", "Campground not found");
           res.redirect("back");
       }  else {
        //render show template with that campground
        res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

// ====== EDIT CAMPGROUND ROUTE ======
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
        Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground: foundCampground});
        });
});

// ====== UPDATE CAMPGROUND ROUTE ======
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
   //find and update the correct campground
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
          //redirect somewhere(show page)
          res.redirect("/campgrounds/" + req.params.id);
       }
   })
});

// ====== DESTROY CAMPGROUND ROUTE ======
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds");
       }
    });
});

module.exports = router;