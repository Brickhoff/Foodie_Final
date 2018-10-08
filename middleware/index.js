var connection = require('../config/database');

// all the middleare goes here
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();
		
	// if they aren't redirect them to the login page
	req.flash("error", "You need to be logged in to do that");
	res.redirect('/login');
}

middlewareObj.checkRestaurantOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        var id = req.params.id;
        connection.query('SELECT * FROM restaurants WHERE id = ?', [id], function(err, result){
            if (err) {
                req.flash("error", "Restaurant not found");
                res.redirect("back");
            } else {
                // does user own the restuarant?
                if (result[0].user_id == req.user.id){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirct("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
      var id = req.params.comment_id;
      connection.query('SELECT * FROM comments WHERE id = ?', [id], function(err, result){
         if (err) {
             req.flash("error", "Comment not found");
             res.redirect("back");
         } else {
             // does user own the comment?
             if (result[0].user_id == req.user.id) {
                 next();
             } else {
                 req.flash("error", "You don't have permission to do that");
                 res.redirect("back");
             }
         }
      });
  }  else {
      req.flash("error", "You need to be logged in to do that");
      res.redirect("back");
  }
};

module.exports = middlewareObj;