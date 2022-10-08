const Album = require('../models/AlbumModel');
const ReviewService = require('../services/ReviewService');
const log = require('npmlog');

const ExpressError = require('../utils/ExpressError');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({storage});


const createAlbum = async (body, uploaderId, file) => {

    const album = new Album(body);
    album.uploader = uploaderId;

    if(file)
        album.coverPhoto = file.path;
        
    await album.save();

    return album;
}

const findAlbum = async(id) => {
        

    const album = Album.findById(id).populate('uploader').populate('artist').populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    });

    if(album)
        return album;
    

    throw new ExpressError('Album not found', 400);
    
}

const findAllAlbums = async () => {
        
    const albums = Album.find({});

    if(albums)
        return albums;

    throw new ExpressError('Albums not found', 400);
        
}

const findOtherAlbumsByArtist = async (artistId, albumId) => {

    const albums = await Album.find({ $and: [ { artist : artistId }, { _id : {$ne: albumId }} ] });

    return albums;
}

const editAlbum = async(id, body, file) => {
        
    const album = await Album.findByIdAndUpdate(id, body);
    
    if(file)
        album.coverPhoto = file.path;

    if(album){
        await album.save();
        return album;
    }
        
    throw new ExpressError('Album not found', 400);           

}

const deleteAlbum = async (id) => {

    const album = await Album.findById(id);

    

    if(album){
        //await ReviewService.deleteReviewsForAlbum(album._id);
        await deleteAlbumReviews(album.reviews);
        await Album.findByIdAndDelete(id);
    }else{
        throw new ExpressError('Album not found', 400);
    }

}


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
    createAlbum,
    findAlbum,
    findAllAlbums,
    editAlbum,
    deleteAlbum,
    deleteAlbumsByArtist,
    findOtherAlbumsByArtist
}