const Role = require('../models/RoleModel');
const log = require('npmlog');
const ExpressError = require('../utils/ExpressError');

module.exports.findRole = async (id) => {

    log.info('Role ID', id);
    const role = await Role.findById(id).populate('roleType');

    if(role)
        return role;
    
    throw new ExpressError('Role not found', 400);

}