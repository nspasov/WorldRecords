const Joi = require('joi');
const log = require('npmlog');

module.exports.ArtistSchema = Joi.object({
    artist: Joi.object({
        name: Joi.string().required(),
        photo: Joi.string(),
        description: Joi.string()
    }).required()
});




















