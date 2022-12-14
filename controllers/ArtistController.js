const Artist = require('../models/ArtistModel');
const Album = require('../models/AlbumModel');
const Review = require('../models/ReviewModel');
const { cloudinary } = require('../cloudinary');
const { isLoggedIn, isArtistUploader, validateArtist } = require('../middleware/middleware');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const artistService = require('../services/ArtistService');
const RoleService = require('../services/RoleService');
const log = require('npmlog');

module.exports.index = async (req,res) => {

    try{

        const artists = await artistService.findAllArtists();
        res.render('artists/index', {artists});

    }catch(err){
        log.error('All Artists', err);
    }


}

module.exports.renderNewForm = async (req,res) => {

    res.render('artists/new');
    
}

module.exports.createArtist = async (req,res) => {

    try{
        const body = req.body.artist;
        const userId = req.user._id;
        
        const file = req.file;

        const artist = await artistService.createArtist(body, userId, file);
        

        req.flash('success', `${artist.name} successfully created.`);
        res.redirect(`/artists/${artist._id}`);

    }catch(err){
        log.error(err);
        req.flash('error', 'Failed to create artist.');
        res.redirect('/artists');
    }
    
}

module.exports.showArtist = async (req,res) => {

    try{

        const id = req.params.id;
        let loggedUserRole;
        const artist = await artistService.findArtist(id);
        if(req.user)
            loggedUserRole = await RoleService.findRole(req.user.role._id);

        res.render('artists/show', {artist, loggedUserRole});

    }catch(err){
        log.error(err);
        req.flash('error', 'Failed to load artist.');
    }
    
}

module.exports.renderEditForm = async (req,res) => {

    try{

        const id = req.params.id;
        const artist = await artistService.findArtist(id);
        res.render('artists/edit', {artist});

    }catch(err){

        log.error(err);
        req.flash('error', 'Failed to load artist.');

    }
    
}

module.exports.editArtist = async (req, res) => {

    try{


        const id = req.params.id;
        const file = req.file;
        const artist = await artistService.editArtist(id, {...req.body.artist}, file);
    
        req.flash('success', `${artist.name} successfully updated`);
        res.redirect(`/artists/${artist._id}`);

    }catch(err){
        log.error('error', err);
        req.flash('error', 'Error editing artist');
        res.redirect('/artists');
    }

}


module.exports.deleteArtist = async (req,res) => {

    try{

        const id = req.params.id;  
        artistService.deleteArtist(id);

        req.flash('success', 'Successfully deleted');
        res.redirect('/artists');

    }catch(err){

        log.error('error', err);
        req.flash('error', 'Error deleting artist');
        res.redirect('/artists');

    }
    
}