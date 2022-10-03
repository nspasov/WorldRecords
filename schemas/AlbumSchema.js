const Joi = require('joi');

module.exports.AlbumSchema = Joi.object({
    album: Joi.object({
        name: Joi.string().required(),
        artist: Joi.string().required(),
        coverPhoto: Joi.string(),
        genre: Joi.string(),
        releaseYear: Joi.number(),
        youTubeLink: Joi.string(),
        reviewScore: Joi.number().min(1).max(5)
    }).required()
});
