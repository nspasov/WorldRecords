const User = require('../models/UserModel');
const Role = require('../models/RoleModel');
const log = require('npmlog');

const registerUser = async (email, username, password) => {

    const roleId = await assignRoleId('user');
    const user = new User({email, username, roleId});         
    const registeredUser = await User.register(user, password);
    return registeredUser;

}

const editUser = async (id, body, file) => {

    const user = await User.findByIdAndUpdate(id, body);

    if(file)
        user.avatar = file.path;
    
    if(user){
        await user.save();
        return user;
    }

    throw new ExpressError('User not found', 400); 

}

const assignRoleId = async (roleType) => {

    try{     
        const role = await Role.findOne({roleType: roleType});
        return role._id;
    }catch (err){
        log.error('Assign Role Id', err);
    }

}

const changeRole = async (user, roleType) => {
    try{
        const role = await Role.findOne({roleType: roleType});
        user.roleId = role._id;
        await user.save();
    }catch (err){
        log.error('Change Role', err);
    }
}

const verifyRole = async (user, roleType) => {   // Maybe better idea is to move to middleware. Ok for now, since it will be used in the future..

    try{

        const role = await Role.findOne({roleType: roleType});
        if (user.roleId === role._id)
            return true;
        return false;

    } catch(err) {
        log.error('Verify Role', err);
    }

}

const getUser = async (userId) => {

    try{

        const user = await User.findById(userId).populate('role');
        return user;

    }catch(err){
        log.error('Get User', err);
    }

}

module.exports = {
    registerUser,
    editUser,
    assignRoleId,
    changeRole,
    verifyRole,
    getUser
}