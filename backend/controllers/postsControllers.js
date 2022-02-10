const Post = require('../models/postsModel');

exports.showAllPosts = (req, res, next) => {
    Post.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};
exports.createOnePost = (req, res, next) => {
    const post = JSON.parse(req.body.post);
    const postToCreate = Post.build({
        nom_auteur: post.nom_auteur,
        prenom_auteur: post.prenom_auteur,
        poste_auteur: post.poste_auteur,
        user_id: post.user_id,
        messages: post.messages,
        urlMedia: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log(postToCreate);
    postToCreate.save()
        .then(() => res.status(201).json({ message: 'Post enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};