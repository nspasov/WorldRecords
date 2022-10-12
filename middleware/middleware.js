const ExpressError = require('../utils/ExpressError');
const { AlbumSchema } = require('../schemas/AlbumSchema');
const { ArtistSchema } = require('../schemas/ArtistSchema');
const { ReviewSchema } = require('../schemas/ReviewSchema');
const { UserSchema } = require('../schemas/UserSchema');
const Album = require('../models/AlbumModel');
const Artist = require('../models/ArtistModel');
const Review = require('../models/ReviewModel');
const User = require('../models/UserModel');
const log = require('npmlog');



module.exports.isLoggedIn = (req,res,next) => {

    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl; // Keeps the url from which the user comes
        req.flash('error', 'You must be logged in!');
        return res.redirect('/users/login');
    }
    next();
}

module.exports.validateAlbum = (req,res,next) => {

    const result = AlbumSchema.validate(req.body);

    if(result.error){
        const msg = result.error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }else{
        next();
    }

}

module.exports.validateArtist = (req,res,next) => {

    const result = ArtistSchema.validate(req.body);

    if(result.error){
        const msg = result.error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }else{
        next();
    }

}

module.exports.validateReview = (req,res,next) => {

    const result = ReviewSchema.validate(req.body);
    

    if(result.error){
        const msg = result.error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }else{
        next();
    }

}

module.exports.validateUser = async (req, res, next) => {

    log.info('Validate user middleware');

    const result = UserSchema.validate(req.body);

    if(result.error){
        const msg = result.error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }else{
        next();
    }
    
}

module.exports.isAlbumUploader =  async (req,res,next) => {

    const id = req.params.id;

    const album = await Album.findById(id);

    if(!album.uploader.equals(req.user._id)){
        req.flash('error', 'No permission');
        return res.redirect(`/albums/${id}`);
    }

    next();

}

module.exports.isArtistUploader = async (req,res,next) => {

    log.info('Request Body is uploader', req.body);

    const id = req.params.id;

    const artist = await Artist.findById(id);

    if(!artist.uploader.equals(req.user._id)){
        req.flash('error', 'No permission');
        return res.redirect(`/artists/${id}`);
    }

    next();

}

module.exports.isReviewUploader = async (req,res,next) => {

    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash('error', 'No permission');
        return res.redirect(`/albums/${id}`);
    }
    next();

}

module.exports.isAuthorized = async (req,res,next) => {

    log.info('IsAuthorized middleware')

    const id = req.params.id;
    const user = await User.findById(id).populate('role');
    const currentUser = await User.findById(req.user._id).populate('role');

    if(currentUser.role.roleType !== 'super admin' && !currentUser._id.equals(user._id)){
        req.flash('error', 'No permission');
        return res.redirect(`/`);
    }

    next();

}




