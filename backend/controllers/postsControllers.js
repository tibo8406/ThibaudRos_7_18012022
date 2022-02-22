const Post = require('../models/postsModel');
const employeeSchema = require('../models/userModel');
const Comment = require('../models/commentsModel');
require('dotenv').config();




exports.showAllPosts = (req, res, next) => {
    Post.findAll({
            order: [
                ['id', 'DESC'],
            ],

            include: [{
                model: employeeSchema,
                as: 'createur',
                attributes: ['nom', 'prenom', 'poste', 'urlImg'],

            }],
        })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));

};

exports.createOnePost = (req, res, next) => {
    const post = JSON.parse(req.body.post);

    const postToCreate = Post.build({
        createurId: req.token.id,
        messages: post.messages,
        urlMedia: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
    });
    postToCreate.save()
        .then(() => res.status(201).json({ message: 'Post enregistré !' }))
        .catch(error => res.status(400).json({ error }));


};

exports.commentOnePost = (req, res, next) => {
    const commentToCreate = Comment.build({
        postId: req.body.postId,
        comment: req.body.message,
        createurId: req.token.id
    });
    commentToCreate.save()
        .then(() => res.status(201).json({ message: 'Commentaire enregistré !' }))
        .catch(error => res.status(400).json({ error }))
};

exports.findCommentForOnePost = (req, res, next) => {
    Comment.findAll({
            order: [
                ['id', 'ASC'],
            ],

            include: [{
                model: employeeSchema,
                as: 'createur',
                attributes: ['nom', 'prenom', 'poste', 'urlImg'],

            }],
        })
        .then((thoseComments) => {
            if (thoseComments !== null) {
                res.status(200).json(thoseComments);
            } else {
                res.status(401).json({ error: "Aucun commentaire pour ce post" });
            }

        });
};
/*exports.likeOnePost = (req, res, next) => {
    Like.findOne({ where: { id: req.params.id } })
        .then((thisPost) => {
            if (thisPost !== null) {
                Like.update({
                        nb_likes: +1,
                    }, {
                        where: { postId: req.params.id }
                    })
                    .then(() => res.status(201).json({ message: 'Post liké !' }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                const likeToCreate = Like.build({
                    postId: req.params.id,
                    nb_likes: +1
                })
                likeToCreate.save()
                    .then(() => res.status(201).json({ message: 'Like créé et Post liké !' }))
                    .catch(error => res.status(400).json({ error }));
            }

        });
}*/