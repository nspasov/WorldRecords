const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    artist : {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    coverPhoto: String,
    genre: {
        type: String,
        enum: ['rock', 'jazz', 'blues', 'folk', 'country', 'pop', 'hip-hop', 'soul', 'funk', 'punk'],
        required: true
    },
    releaseYear: Number,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    youTubeLink: String,
    reviewScore: Number,
    uploader: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

module.exports = mongoose.model('Album', AlbumSchema);