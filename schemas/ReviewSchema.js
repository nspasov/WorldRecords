const Joi = require('joi');


module.exports.ReviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        text: Joi.string().required()
    })
}).required();