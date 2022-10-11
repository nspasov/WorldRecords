const User = require('../models/UserModel');
const Role = require('../models/RoleModel');
const UserService = require('../services/UserService');
const log = require('npmlog');

module.exports.index = async(req, res) => {

    const user = await UserService.getUser(req.params.id);

    res.render('users/index', {user});

}

module.exports.renderLoginForm = (req,res) => {
    res.render('users/login');
}

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register');
}

module.exports.renderEditForm = async (req, res) => {
    const user = await UserService.getUser(req.params.id);
    //const isSuperAdmin = ''
    res.render('users/edit', {user});
}

module.exports.editUser = async (req, res) => {

    const id = req.params.id;

    try{

        const file = req.file;
        const user = await UserService.editUser(id, {...req.body.user}, file);
        req.flash('Success', 'User succesfully updated');
        res.redirect(`/users/${id}`);

    }catch(err){
        log.error('error', err);
        req.flash('error', 'Error editing user');
        res.redirect(`/users/${id}`);
    }

}

module.exports.login = (req, res) => {
    try{

        req.flash('success', `Welcome back, ${req.user.username}`);
        res.redirect('/');

    }catch (err){
        req.flash('error', 'Ivalid credentials');
        res.redirect('/users/login');
    }
    
}

module.exports.register = async (req, res, next) => {


    try{

        const {email, username, password} = req.body;
        const registeredUser = await UserService.registerUser(email, username, password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success',`Nice to meet you, ${username}!`);
            res.redirect('/');
        });

    }catch(e){

        req.flash('error', e.message);
        log.info('error', e.message);
        res.redirect('/register');

    }

}

module.exports.logout = (req,res, next) => {

   const username = req.user.username;

   req.logout((err) => {
    if(err)
        return next(err);
    req.flash('success', `See you soon, ${username}!`);
    res.redirect('/');
   });

}