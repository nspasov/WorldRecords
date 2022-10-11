const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/UserModel');
const userController = require('../controllers/UserController');
const catchAsync = require('../utils/CatchAsync');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({storage});
const { isLoggedIn, isAuthorized, validateUser } = require('../middleware/middleware');




router.get('/register', userController.renderRegisterForm);

router.post('/register', catchAsync(userController.register));

router.get('/login', userController.renderLoginForm);

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/users/login' }), userController.login);

router.get('/logout', userController.logout);

router.get('/:id', catchAsync(userController.index));

router.get('/:id/edit', isLoggedIn, isAuthorized, catchAsync(userController.renderEditForm));

router.put('/:id', isLoggedIn, isAuthorized, upload.single('image'), validateUser, catchAsync(userController.editUser));






module.exports = router;