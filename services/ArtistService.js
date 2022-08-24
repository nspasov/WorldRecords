const User = require('../models/UserModel');
const Artist = require('../models/ArtistModel');
const AlbumService = require('../services/AlbumService');
const log = require('npmlog');

const createArtist = async (body, uploaderId) => {

        const artist = new Artist(body);
        artist.uploader = uploaderId;
        await artist.save();

        return artist;
}

const findArtist = async(id) => {
    const artist = Artist.findById(id).populate('uploader').populate('albums');
    return artist;
}

const findAllArtists = async () => {
        const artists = Artist.find({});
        return artists;
}

const editArtist = async(id, body) => {

    const artist = await Artist.findByIdAndUpdate(id, body);

    
            // const images = req.files.map(f => ({url: f.path, filename: f.filename}));
            // campground.images.push(...images);
    
            // if(req.body.deleteImage){
    
            //     for(let filename of req.body.deleteImages){
            //        await cloudinary.uploader.destroy(filename);
            //     }
            //     await campground.updateOne({ $pull: {images: {filename: {$in: req.body.deleteImages}}} });
            // }
    
    await artist.save();
    return artist;
}

const deleteArtist = async (id) => {
        const artist = await Artist.findById(id);
        await AlbumService.deleteAlbumsByArtist(artist._id);
        await Artist.findByIdAndDelete(id);
}

module.exports = {
    createArtist,
    editArtist,
    deleteArtist,
    findArtist,
    findAllArtists
}