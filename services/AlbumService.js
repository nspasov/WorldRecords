const Album = require('../models/AlbumModel');
const ReviewService = require('../services/ReviewService');
const log = require('npmlog');

const deleteAlbumsByArtist = async(artistId) =>{

    try{

        const relatedAlbums = await Album.find({artist: artistId});
        const relatedReviews = [];
    
        relatedAlbums.forEach(async (album) => {
            relatedReviews.push(...album.reviews);
            await Album.findByIdAndDelete(album._id);
        });
    
        await deleteAlbumReviews(relatedReviews);

    }catch(err){
        log.error('Deleting Albums', err);
    }


}

const deleteAlbumReviews = async(relatedReviews) => {

    relatedReviews.forEach(async (review) => {
       await ReviewService.deleteReview(review._id);
    });

}


module.exports = {
    deleteAlbumsByArtist
}