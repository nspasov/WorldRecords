const Review = require('../models/ReviewModel');
const Album = require('../models/AlbumModel');
const log = require('npmlog');

const postReview = async (albumId, body, userId) => {

    try{

        log.info('Posting review');
        log.info(albumId);
        log.info(body);
        
        const album = await Album.findById(albumId);
        const review = new Review(body);
        review.author = userId;
        album.reviews.push(review);
        await review.save();
        await album.save();

    }catch(err){
        log.error('Posting Review', err)
    }

}

const deleteReview = async (id) => {

    try{
        await Review.findByIdAndDelete(id);

    }catch(err){
        log('Deleting Review', err);
    }
    
}


module.exports = {
    postReview,
    deleteReview
}