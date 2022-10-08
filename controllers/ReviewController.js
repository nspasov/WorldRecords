const Review = require('../models/ReviewModel');
const ReviewService = require('../services/ReviewService');
const Album = require('../models/AlbumModel');
const log = require('npmlog');

module.exports.postReview = async (req,res) => {


    const albumId = req.params.id;
    const body = req.body.review;
    const userId = req.user._id;

    try{

        log.info('req params', req.params);
        log.info('req body', req.body.review);
        await ReviewService.postReview(albumId, body, userId);

        
        
        req.flash('success', 'Review added successfully');
        

    }catch(err){

        log.error(err);
        req.flash('error', 'Something went wrong');

    }

    res.redirect(`/albums/${albumId}`);

}

module.exports.deleteReview = async (req, res) => {

    const albumId = req.params.id;

    try{

        const reviewId = req.params.reviewId;
        await ReviewService.deleteReview(reviewId);

        req.flash('success', 'Successfully deleted');

    }catch(err){

        log.error('error', err);
        req.flash('error', 'Error deleting review');

    }

    res.redirect(`/albums/${albumId}`);

}