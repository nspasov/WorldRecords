const Joi = require('joi');

module.exports.UserSchema = Joi.object({
    user: Joi.object({
        avatar: Joi.string(),
        email: Joi.string().required(),
        bio: Joi.string()
    }).required()
});