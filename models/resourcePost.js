const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const _ = require('lodash');
const mongoose = require('mongoose');
//TODO: add schema and validation for branch, sem, subject as enum
//TODO: implement uploading content files
const resourePostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 150
    },
    content: {
        type: String,
        required: true,
        minlength: 1
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    votes: {
        type: Number,
        default: 0,
        min: 0
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    }],
},{ timestamps: true });

const ResourcePost = mongoose.model('ResourcePost', resourePostSchema);
function validatePost(post){
    const schema = Joi.object({
        title: Joi.string().min(3).max(150).required(),
        content: Joi.string().min(1).required(),
        authorId: Joi.objectId().required()
    });

    return schema.validate(post);
}

function pickData(post){
    return _.pick(post, ['title', 'content', 'authorId']);
}

exports.ResourcePost = ResourcePost;
exports.validateResourcePost = validatePost;
exports.pickResourcePostData = pickData;