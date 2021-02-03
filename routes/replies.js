const Joi = require('joi');
const auth = require('../middlewares/auth');
const anonymous = require('../middlewares/anonymous');
const router = require('express').Router();
const { Reply, validateReply, pickReplyData} = require('../models/reply');
const { ResourcePost } = require('../models/resourcePost');

router.post('/', [auth, anonymous], async (req, res) => {
    const { error } = validateReply(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    if(req.body.of.contentType === ResourcePost.modelName){
        const post = await ResourcePost.findById(req.body.of.id);
        if(!post) return res.status(404).send('Error! Post not found!');
    }

    else if(req.body.of.contentType === Reply.modelName){
        const reply = await Reply.findById(req.body.of.id);
        if(!reply) return res.status(404).send('Error! Reply not found!');
    }

    let reply = new Reply(pickReplyData(req.body));

    //can there be data inconsistency here? if Yes, then how to refactor this? 
    try {
        await reply.save();
    } catch (error) {
        return res.status(500).send("1Failed to reply, try again later...");
    }
    let result;
    if(req.body.of.contentType === ResourcePost.modelName)
        result = await ResourcePost.updateOne({_id: req.body.of.id}, { $push: {replies: reply._id} });

    else if(req.body.of.contentType === Reply.modelName)
        result = await Reply.updateOne({_id: req.body.of.id }, { $push: {replies: reply._id}});

    if(result.n) return res.status(200).send({ id: reply.id });
    else return res.status(500).send("2Failed to reply, try again later...");
});

module.exports = router;