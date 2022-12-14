const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/CatchAsync');
const albumController = require('../controllers/AlbumController');
const Album = require('../models/AlbumModel');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({storage});
const { isLoggedIn, isAlbumUploaderOrAdmin, validateAlbum } = require('../middleware/middleware');
const log = require('npmlog');


router.get('/',  catchAsync(albumController.index));

router.get('/new', isLoggedIn, albumController.renderNewForm);

router.post('/', isLoggedIn, upload.single('image'), validateAlbum, catchAsync(albumController.createAlbum));

router.get('/:id', albumController.showAlbum);

router.get('/:id/edit', isLoggedIn, isAlbumUploaderOrAdmin, catchAsync(albumController.renderEditForm));

router.put('/:id',  isLoggedIn, isAlbumUploaderOrAdmin, upload.single('image'), validateAlbum, catchAsync(albumController.editAlbum));

router.delete('/:id', isLoggedIn, isAlbumUploaderOrAdmin, catchAsync(albumController.deleteAlbum));

module.exports = router;