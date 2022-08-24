const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/CatchAsync');
const artistController = require('../controllers/ArtistController');
const Artist = require('../models/ArtistModel');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({storage});
const {isLoggedIn, isArtistUploader, validateArtist} = require('../middleware/middleware');
const log = require('npmlog');


router.get('/',  catchAsync(artistController.index));

router.get('/new', isLoggedIn, artistController.renderNewForm);

router.post('/', isLoggedIn, upload.single('image'), validateArtist, catchAsync(artistController.createArtist));

router.get('/:id', artistController.showArtist);

router.get('/:id/edit', isLoggedIn, isArtistUploader, catchAsync(artistController.renderEditForm));

//router.put('/:id', isLoggedIn, isArtistUploader, upload.single('image'), validateArtist, catchAsync(artistController.editArtist));

router.put('/:id',  isLoggedIn, isArtistUploader, validateArtist, catchAsync(artistController.editArtist));


router.delete('/:id', isLoggedIn, isArtistUploader, catchAsync(artistController.deleteArtist));

module.exports = router;