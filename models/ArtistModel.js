const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    photo: String,
    description: {
        type: String,
        required: true
    },
    albums: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Album'
        }
    ],
    uploader: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    
});

module.exports = mongoose.model('Artist', ArtistSchema);