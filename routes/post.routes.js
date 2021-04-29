const {Router} = require('express');

const router = Router();

const Post = require('../models/Post')

router.post('/add', async (req, res) => {
    try {
        const {text, title, imgUrl} = req.body

        const post = new Post({
            text, title, imgUrl
        })

        await  post.save()
        res.json(post)
    } catch (e) {
        console.log(e)
    }
})

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find() // Find all posts
        res.json(posts)
    } catch (e) {

    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params // Find post by params
        const post = await Post.findById(id);
        res.json(post)
    } catch (e) {
        console.log(e)
    }
})

router.post('/remove', async (req, res) => {
    try {
        const { postId } = req.body // Find post by params
        await Post.findByIdAndDelete(postId);
        res.json({message: 'Post has been deleted!'})
    } catch (e) {
        console.log(e)
    }
})

module.exports = router
