const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleModel = new Schema({
    roleType: {
        type: String,
        enum: ['user', 'admin', 'super admin'],
        required: true,
        immutable: true
    }
});

module.exports = mongoose.model('Role', RoleModel);


