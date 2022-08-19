const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/UserModel');
const userController = require('../controllers/UserController');
const catchAsync = require('../utils/CatchAsync');


router.get('/register', userController.renderRegisterForm);

router.post('/register', catchAsync(userController.register));

router.get('/login', userController.renderLoginForm);

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userController.login);

router.get('/logout', userController.logout);


module.exports = router;