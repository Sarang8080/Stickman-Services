var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/users");


router.get("/",function(req,res){
    res.render("landing");
})


/********************/
//Auth routes

//Register route
router.get("/signup",function(req,res){
    res.render("signup")
})

//Post Register route
router.post("/signup",function(req,res){
    User.register(new User({email: req.body.email,username: req.body.username,image:req.body.image}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('signup');
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/signin");
        });
    });
});

//Login Route
router.get("/signin",function(req,res){
    res.render("signin")
})

//Login post route

router.post("/signin", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/signup"
}) ,function(req, res){
});

router.get("/profile",function(req,res){
    res.render("profile",{currentUser:req.user})
  
 })

//logout route
router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/")
})

//middleware that checks whether user is logged in or not
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;