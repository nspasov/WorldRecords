const Role = require('../models/RoleModel');
const log = require('npmlog');
const ExpressError = require('../utils/ExpressError');

module.exports.findRole = async (id) => {

    const role = await Role.findById(id).populate('roleType');

    if(role)
        return role;
    
    throw new ExpressError('Role not found', 400);

}

module.exports.getAllRoles = async () => {

    const roles = await Role.find({});

    return roles;

}