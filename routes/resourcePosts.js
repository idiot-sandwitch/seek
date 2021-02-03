const auth = require('../middlewares/auth');
const anonymous = require('../middlewares/anonymous');
const router = require('express').Router();
const { ResourcePost, validateResourcePost, pickResourcePostData } = require('../models/resourcePost');
const { User } = require('../models/user');

router.get('/post', async (req, res) => {
    const id = req.body.id;
    const post = await ResourcePost.findById(id);
    if(!post) res.status(404).send('Post not found!');
    else res.status(200).send(post);
});

//TODO: implement this after updating schema and validation
// router.get('/posts/:branch/:sem/:subject', async (req, res) => {
//     const { branch, sem, subject } = req.params;
//     const posts = await ResourcePost.find()
// });

//TODO: remove this after above get request is working
router.get('/posts', async (req, res) => {
    try{
        const posts = await ResourcePost.find();
        res.status(200).send(posts);
    }catch(e){
        console.error(e.message);
        res.status(404).send('No posts found!');
    }
});

router.post('/add', [auth, anonymous], async (req, res) => {
    const { error } = validateResourcePost(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let post = new ResourcePost(pickResourcePostData(req.body));
    try { 
        await post.save();
        res.status(200).send({ id: post.id});
    } catch (error) {
        res.status(500).send("Failed creating post, try again later...");
        console.error(error);
    }
});

router.put('/upvote', auth, async (req, res) => {
    const post = await ResourcePost.findById(req.body.id);
    if(!post) return res.status(404).send('Post not found!');

    const user = await User.findOne({_id: req.user._id, upvoted: req.body.id});
    if(user) return res.status(200).send('Post upvoted!');

    //can there be data incosistency here? if Yes, then how to refactor this?
    const userRes = User.updateOne({_id: req.user._id}, {$addToSet: {upvoted: req.body.id }});
    const postRes = ResourcePost.updateOne({_id: req.body.id}, {$inc: {votes: 1}});

    Promise.all([userRes, postRes])
        .then( () => {res.status(200).send('Post upvoted!');})
        .catch( (err) => {
            console.error(err.message);
            res.status(500).send('Failed to upvote post...');
        });
});

router.put('/downvote', auth, async (req, res) => {
    const post = await ResourcePost.findById(req.body.id);
    if(!post) return res.status(404).send('Post not found!');

    const user = await User.findOne({_id: req.user._id, upvoted: req.body.id});
    if(!user) return res.status(200).send('Post downvoted!');

    const userRes = User.updateOne({_id: req.user._id}, {$pullAll: {upvoted: [req.body.id] }});
    const postRes = ResourcePost.updateOne({_id: req.body.id}, {$inc: {votes: -1}});

    Promise.all([userRes, postRes])
        .then( () => {res.status(200).send('Post downvoted!');})
        .catch( (err) => {
            console.error(err.message);
            res.status(500).send('Failed to downvote post...');
        });
});

module.exports = router;