const auth = require('../middleware/auth');
const router = require('express').Router();
const { ResourcePost, validateResourcePost, pickResourcePostData } = require('../models/resourcePost');
const { User } = require('../models/user');

router.get('/post/:id', async (req, res) => {
    const id = req.params.id;
    const post = await ResourcePost.findById(id);
    if(!post) res.status(404).send('Post not found!');
    else res.status(200).send(post);
});

//TODO: implement this after updating schema and validation
// router.get('/posts/:branch/:sem/:subject', async (req, res) => {
//     const { branch, sem, subject } = req.params;
//     const posts = await ResourcePost.find()
// });

router.get('/posts', async (req, res) => {
    try{
        const posts = await ResourcePost.find();
        res.status(200).send(posts);
    }catch(e){
        console.error(e.message);
        res.status(404).send('No posts found!');
    }
});

router.post('/add', auth, async (req, res) => {
    req.body.authorId = req.user._id;
    const { error } = validateResourcePost(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let post = new ResourcePost(pickResourcePostData(req.body));
    try { 
        await post.save();
        res.status(200).send({ id: post.id});
    }
    catch (error) {
        res.status(500).send("Failed creating post, try again later...");
        console.error(error);
    }
});

router.put('/upvote/:id', auth, async (req, res) => {
    const post = await ResourcePost.findById(req.params.id);
    if(!post) return res.status(404).send('Post not found!');

    const user = await User.findOne({_id: req.user._id, upvoted: req.params.id});
    if(user) return res.status(200).send('Post upvoted!');

    //can there be data incosistency here? if Yes, then how to refactor this?
    const userRes = User.updateOne({_id: req.user._id}, {$addToSet: {upvoted: req.params.id }});
    const postRes = ResourcePost.updateOne({_id: req.params.id}, {$inc: {votes: 1}});

    Promise.all([userRes, postRes])
        .then( () => {res.status(200).send('Post upvoted!');})
        .catch( (err) => {
            console.error(err.message);
            res.status(500).send('Failed to upvote post...');
        });
});

router.put('/downvote/:id', auth, async (req, res) => {
    const post = await ResourcePost.findById(req.params.id);
    if(!post) return res.status(404).send('Post not found!');

    const user = await User.findOne({_id: req.user._id, upvoted: req.params.id});
    if(!user) return res.status(200).send('Post downvoted!');

    const userRes = User.updateOne({_id: req.user._id}, {$pullAll: {upvoted: [req.params.id] }});
    const postRes = ResourcePost.updateOne({_id: req.params.id}, {$inc: {votes: -1}});

    Promise.all([userRes, postRes])
        .then( () => {res.status(200).send('Post downvoted!');})
        .catch( (err) => {
            console.error(err.message);
            res.status(500).send('Failed to downvote post...');
        });
});

module.exports = router;