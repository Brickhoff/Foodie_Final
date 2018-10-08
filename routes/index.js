var express = require("express");
var router  = express.Router({mergeParams: true});
var connection = require('../config/database');
var passport = require("passport");

router.get("/", function(req, res){
   res.render("landing"); 
});

// ==============
// Auth Routes
// ==============

// show register form
router.get("/signup", function(req, res){
   res.render("signup", { message: req.flash('signupMessage'), page: 'signup' }); 
});


// handle sign up logic
router.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/restaurants', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
}));

// Show login form
router.get("/login", function(req, res){
   res.render("login", { message: req.flash('loginMessage'), page: 'login' }); 
});

// handle login logic
router.post('/login', passport.authenticate('local-login', {
            successRedirect : '/restaurants', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
            
            res.redirect('/');
});

// Add logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged You Out!");
   res.redirect("/restaurants");
});



// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the login page
	res.redirect('/login');
}

module.exports = router;