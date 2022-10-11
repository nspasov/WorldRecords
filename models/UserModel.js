const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserModel = new Schema({
    avatar: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type: String
    },
    favouriteAlbums: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Album'
        }
    ],
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }
});

UserModel.plugin(passportLocalMongoose);  // adds username, password, salt
module.exports = mongoose.model('User', UserModel);