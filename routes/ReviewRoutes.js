const express = require('express');
const router = express.Router({mergeParams : true});
const catchAsync = require('../utils/CatchAsync');
const Review = require('../models/ReviewModel');
const Album = require('../models/AlbumModel');
const reviewController = require('../controllers/ReviewController');
const {isLoggedIn, validateReview, isReviewUploaderOrAdmin} = require('../middleware/middleware');
const log = require('npmlog');

router.post('/', isLoggedIn, validateReview, catchAsync(reviewController.postReview));

router.delete('/:reviewId', isLoggedIn, isReviewUploaderOrAdmin, catchAsync(reviewController.deleteReview));

module.exports = router;