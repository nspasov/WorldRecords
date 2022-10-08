const User = require('../models/UserModel');
const Artist = require('../models/ArtistModel');
const AlbumService = require('../services/AlbumService');
const log = require('npmlog');
const ExpressError = require('../utils/ExpressError');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({storage});

const createArtist = async (body, uploaderId, file) => {

    const artist = new Artist(body);
    artist.uploader = uploaderId;
    //artist.photo = {url: file.path, filename: file.filename};
    if(file)
        artist.photo = file.path;
        
    await artist.save();

    return artist;
}

const findArtist = async (id) => {
        

    const artist = Artist.findById(id).populate('uploader').populate('albums');

    if(artist)
        return artist;
    

    throw new ExpressError('Artist not found', 400);
    
}

const findAllArtists = async () => {
        
    const artists = Artist.find({});

    if(artists)
        return artists;

    throw new ExpressError('Artists not found', 400);
        
}

const editArtist = async (id, body, file) => {
        
    const artist = await Artist.findByIdAndUpdate(id, body);
    if(file)
        artist.photo = file.path;

    if(artist){
        await artist.save();
        return artist;
    }
        
    throw new ExpressError('Artists not found', 400);           

}

const deleteArtist = async (id) => {
    const artist = await Artist.findById(id);
    if(artist){
        await AlbumService.deleteAlbumsByArtist(artist._id);
        await Artist.findByIdAndDelete(id);
    }else{
        throw new ExpressError('Artist not found', 400);
    }
    
    

}

module.exports = {  
    createArtist,
    editArtist,
    deleteArtist,
    findArtist,
    findAllArtists
}