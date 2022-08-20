const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    avatar: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    roleId: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }
});

UserSchema.plugin(passportLocalMongoose);  // adds username, password, salt
module.exports = mongoose.model('User', UserSchema);