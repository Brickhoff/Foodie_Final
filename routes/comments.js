var express = require("express");
var router  = express.Router({mergeParams: true});
var connection = require('../config/database');
var middleware = require("../middleware/index");

// =================
// Comments Routes
// =================

router.get("/new", middleware.isLoggedIn, function(req, res){
   var id = req.params.id;
   connection.query('SELECT * FROM restaurants WHERE id = ?', [id], function(err, result){
      if (err) throw err;
      res.render("comments/new", {restaurant: result});
   });
});

router.post("/", middleware.isLoggedIn, function(req, res){
   var restaurantId = req.params.id;
   var newComment = {
       user_id: req.user.id,
       restaurant_id: req.params.id,
       commentText: req.body.commentText
   } ;
   
  connection.query('INSERT INTO comments SET ?',newComment, function(err, result){
      if (err) {
          console.log(err);
          req.flash("error", "Something went wrong");
          res.redirect("/restaurants");
      } else {
             req.flash("success", "Successfully added comment");
             res.redirect('/restaurants/' + restaurantId); 
      }
  });
});

// Comment Edit Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   var id = req.params.comment_id;
   connection.query('SELECT * FROM comments WHERE id = ?', [id], function(err, result){
      console.log(result);
      if (err) {
         req.flash("error", "Comment not found");
         res.redirect("back");
      } else {
         res.render("comments/edit", {restaurantId: req.params.id, comment: result});
      }
   });
});

// Comment Update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   var id = req.params.comment_id;
   var restaurantId = req.params.id;
   var updatedComment = {
      commentText: req.body.commentText
   };
   
   connection.query('UPDATE comments set ? WHERE id = ?', [updatedComment, id], function(err, result){
      if (err) {
         res.redirec("back");
      } else {
         req.flash("success", "Successfully updated comment");
         res.redirect("/restaurants/" + restaurantId);
      }
   });
});

// Comment Destroy Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
   var id = req.params.comment_id;
   var restaurantId = req.params.id;
   connection.query('DELETE FROM comments WHERE id = ?', [id], function(err, result){
      if (err) {
         res.redirect("back");
      } else {
         req.flash("success", "Comment deleted");
         res.redirect("/restaurants/" + restaurantId);
      }
   });
});



// route middleware to make sure
// function isLoggedIn(req, res, next) {

// 	// if user is authenticated in the session, carry on
// 	if (req.isAuthenticated())
// 		return next();

// 	// if they aren't redirect them to the login page
// 	res.redirect('/login');
// }



module.exports = router;