const Artist = require('../models/ArtistModel');
const Album = require('../models/AlbumModel');
const Review = require('../models/ReviewModel');
const { cloudinary } = require('../cloudinary');
const { isLoggedIn, isArtistUploader, validateArtist } = require('../middleware/middleware');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const albumService = require('../services/AlbumService');
const artistService = require('../services/ArtistService');
const log = require('npmlog');

module.exports.index = async (req,res) => {

    try{

        const albums = await albumService.findAllAlbums();
        res.render('albums/index', {albums});

    }catch(err){
        log.error('All Albums', err);
    }


}

module.exports.renderNewForm = async (req,res) => {

    const artists = await artistService.findAllArtists();
    const genres = ['rock', 'jazz', 'blues', 'folk', 'country', 'pop', 'hip-hop', 'soul', 'funk', 'punk'];
    res.render('albums/new', {artists, genres});
    
}

module.exports.createAlbum = async (req,res) => {

    try{
        const body = req.body.album;
        const userId = req.user._id;
        
        const file = req.file;

        const album = await albumService.createAlbum(body, userId, file);
        

        req.flash('success', `${album.name} successfully created.`);
        res.redirect(`/albums/${album._id}`);

    }catch(err){
        log.error(err);
        req.flash('error', 'Failed to create album.');
        res.redirect('/albums');
    }
    
}

module.exports.showAlbum = async (req,res) => {

    try{

        const id = req.params.id;
        const album = await albumService.findAlbum(id);
        const sameArtistAlbums = await albumService.findOtherAlbumsByArtist(album.artist._id, album._id);
        
        log.info('same artist albums', sameArtistAlbums);
        res.render('albums/show', {album, sameArtistAlbums});

    }catch(err){
        log.error(err);
        req.flash('error', 'Failed to load album.');
    }
    
}

module.exports.renderEditForm = async (req,res) => {

    try{

        const id = req.params.id;
        const album = await albumService.findAlbum(id);

        const artists = await artistService.findAllArtists();
        const genres = ['rock', 'jazz', 'blues', 'folk', 'country', 'pop', 'hip-hop', 'soul', 'funk', 'punk'];

        res.render('albums/edit', {album, artists, genres});

    }catch(err){

        log.error(err);
        req.flash('error', 'Failed to load album.');

    }
    
}

module.exports.editAlbum = async (req, res) => {

    try{


        const id = req.params.id;
        const file = req.file;
        const album = await albumService.editAlbum(id, {...req.body.album}, file);
    
        req.flash('success', `${album.name} successfully updated`);
        res.redirect(`/albums/${album._id}`);

    }catch(err){
        log.error('error', err);
        req.flash('error', 'Error editing album');
        res.redirect('/albums');
    }

}


module.exports.deleteAlbum = async (req,res) => {

    try{

        const id = req.params.id;  
        albumService.deleteAlbum(id);

        req.flash('success', 'Successfully deleted');
        res.redirect('/albums');

    }catch(err){

        log.error('error', err);
        req.flash('error', 'Error deleting album');
        res.redirect('/albums');

    }
    
}