var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    Campground     = require("./models/campground"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    seedDB         = require("./seeds"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    flash          = require("connect-flash")

// Requiring Routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")
    

// seedDB();
mongoose.connect("mongoose.connect(mongodb+srv://superuser:Hogwarts1990@cluster0-ghngh.mongodb.net/test?retryWrites=true&w=majority)", {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

//================
// PASSPORT CONFIG
//================
app.use(require("express-session")({
    secret: "Esta aplicacion es de test!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// LIB FOR MOMENT
app.locals.moment = require('moment');

// FLASH CONFIG VARS
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// ROUTES
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server iniciado!");
});

//RESTFUL ROUTES

// name       url         verb     description
// =============================================
// INDEX    /dogs         GET      Display list of all dog   
// NEW      /dogs/new     GET      Displays form to make a new dog
// CREATE   /dogs         POST     Add new dog to Database
// SHOW     /dogs/:id     GET      Show info about one dog

// NEW      /campgrounds/:id/comments/new   GET
// CREATE   /campgrounds/:id/comments       POST