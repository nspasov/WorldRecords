const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({

    artist : {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    coverPhoto: String,
    genre: String,
    releaseYear: Number,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    youTubeLink: String,
    reviewScore: Number,
    Uploader: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
      
});

module.exports = mongoose.model('Album', AlbumSchema);