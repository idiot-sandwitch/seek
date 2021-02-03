const Joi = require('joi');
const _ = require('lodash');
const { anonymousId } = require('../config');

module.exports = function(req, res, next){
    const anon = _.pick(req.body, ['anonymous']);
    if(anon.anonymous){
        const { error } = Joi.object({anonymous: Joi.boolean().required()}).validate(anon);
        if(error) return res.status(400).send(error.details[0].message);

        req.body.authorId = anonymousId;
    }
    else req.body.authorId = req.user._id;
    req.body = _.omit(req.body, ['anonymous']);
    next();
};