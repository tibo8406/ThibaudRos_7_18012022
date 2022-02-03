const Post = require('../models/postsModel');

exports.showAllPosts = (req, res, next) => {
    Post.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};
exports.createOnePost = (req, res, next) => {
    const postToCreate = Post.build({
        messages: req.body.messages,
        urlMedia: `${req.protocol}://${req.get('host')}/images/${req.body.file.filename}`
    });
    console.log(postToCreate);
    postToCreate.save()
        .then(() => res.status(201).json({ message: 'Post enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};