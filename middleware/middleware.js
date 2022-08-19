const ExpressError = require('../utils/ExpressError');


module.exports.isLoggedIn = (req,res,next) => {

    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl; // Keeps the url from which the user comes
        req.flash('error', 'You must be logged in!');
        return res.redirect('/login');
    }
    next();
}
