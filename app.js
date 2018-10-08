var express = require('express');
// var mysql = require('mysql');
var connection = require('./config/database');
var bodyParser  = require("body-parser");
var app = express();
var passport = require('passport');
// var cors = require('cors');
var cookieParser = require('cookie-parser');
var flash    = require('connect-flash');
var methodOverride = require("method-override");

// requiring routes
var restaurantRoutes = require("./routes/restaurants");
var commentRoutes    = require("./routes/comments");
var indexRoutes      = require("./routes/index");

// var mysqlAdmin = require('node-mysql-admin');
// app.use(mysqlAdmin(app));



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash()); // use connect-flash for flash messages
app.locals.moment = require('moment');

// app.use(cors());
 
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'brickhoff',  //your username
//   database : 'foodie'         //the name of your db
// });

require('./config/passport')(passport); // pass passport for configuration

// Passport Configuration
app.use(require("express-session")({
    secret: "Rusty is the best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(flash()); // use connect-flash for flash messages


app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});



// app.get("/", function(req, res){
//   res.render("landing"); 
// });

// INDEX - show all campgrounds
// app.get("/restaurants", function(req, res){
//     var q = "SELECT * FROM restaurants";
//     connection.query(q, function(err, results){
//       if (err) throw err;
//       res.render("restaurants/index", {restaurants: results});
//     });
// });

// // CREATE - add new campground to DB
// app.post("/restaurants", function(req, res){
//   var newRestaurant = {
//       name: req.body.name,
//       image_url: req.body.image,
//       description: req.body.description
//   };
//   connection.query('INSERT INTO restaurants SET ?', newRestaurant, function(err, result){
//       if (err) throw err;
//       res.redirect("/restaurants");
//   });
// });

// // NEW - show form to create new campground
// app.get("/restaurants/new", function(req, res){
//   res.render("restaurants/new"); 
// });

// // SHOW - shows more info about one campground
// app.get("/restaurants/:id", function(req, res) {
//   var id = req.params.id;
//   connection.query('SELECT * FROM restaurants INNER JOIN  comments  ON (restaurants.id = comments.restaurant_id) WHERE restaurants.id = ? ',[id], function(err, result){
//       if (err) throw err;
//       res.render("restaurants/show", {restaurant: result, restaurantId: id});
//   });
// });


// =================
// Comments Routes
// =================

// app.get("/restaurants/:id/comments/new", isLoggedIn, function(req, res){
//   var id = req.params.id;
//   connection.query('SELECT * FROM restaurants WHERE id = ?', [id], function(err, result){
//       if (err) throw err;
//       res.render("comments/new", {restaurant: result});
//   });
// });

// app.post("/restaurants/:id/comments", isLoggedIn, function(req, res){
//   var restaurantId = req.params.id;
//   var newComment = {
//       restaurant_id: req.params.id,
//       commentText: req.body.commentText,
//       author: req.body.author
//   } ;
   
// //   var restaurant_id = req.params.id,
// //       commentText = req.body.commentText,
// //       author = req.body.author;

   
// //   var q = "INSERT INTO comments (commentText, author, restaurant_id) VAULES (commentText, author, id)";


//   connection.query('INSERT INTO comments SET ?',newComment, function(err, result){
//       if (err) {
//           console.log(err);
//           res.redirect("/restaurants");
//       } else {
//              res.redirect('/restaurants/' + restaurantId); 
//       }
//   });
// });
    

// ==============
// Auth Routes
// ==============

// show register form
// app.get("/signup", function(req, res){
//   res.render("signup"); 
// });


// // handle sign up logic
// app.post('/signup', passport.authenticate('local-signup', {
// 		successRedirect : '/restaurants', // redirect to the secure profile section
// 		failureRedirect : '/signup', // redirect back to the signup page if there is an error
// 		failureFlash : true // allow flash messages
// }));

// // Show login form
// app.get("/login", function(req, res){
//   res.render("login"); 
// });

// // handle login logic
// app.post('/login', passport.authenticate('local-login', {
//             successRedirect : '/restaurants', // redirect to the secure profile section
//             failureRedirect : '/login', // redirect back to the signup page if there is an error
//             failureFlash : true // allow flash messages
// 		}),
//         function(req, res) {
//             console.log("hello");

//             if (req.body.remember) {
//               req.session.cookie.maxAge = 1000 * 60 * 3;
//             } else {
//               req.session.cookie.expires = false;
//             }
//         res.redirect('/');
// });

// // Add logout route
// app.get("/logout", function(req, res){
//   req.logout();
//   res.redirect("/restaurants");
// });



// // route middleware to make sure
// function isLoggedIn(req, res, next) {

// 	// if user is authenticated in the session, carry on
// 	if (req.isAuthenticated())
// 		return next();

// 	// if they aren't redirect them to the login page
// 	res.redirect('/login');
// }


app.use("/", indexRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/restaurants/:id/comments", commentRoutes);




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Foodie server has started!!");
});