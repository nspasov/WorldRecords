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

module.exports.login = (req, res) => {
    req.flash('success', `Welcome back, ${req.user.username}`);
    res.redirect('/');
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