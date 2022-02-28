const Post = require('../models/postsModel');
const employeeSchema = require('../models/userModel');
const likesSchema = require('../models/likesModel');
const Comment = require('../models/commentsModel');
const { Op } = require('sequelize');
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

                },
                {
                    model: Comment,
                    as: 'comments',
                    attributes: ['comment'],
                    order: [
                        ['id', 'ASC'],
                    ],

                    include: [{
                        model: employeeSchema,
                        as: 'createur',
                        attributes: ['nom', 'prenom', 'poste', 'urlImg'],

                    }],

                },
                {
                    model: likesSchema,
                    as: 'likes',
                    attributes: ['liked'],

                    include: [{
                        model: employeeSchema,
                        as: 'createur',
                        attributes: ['id'],

                    }]
                }
            ],
        })
        .then(posts => res.status(200).json(posts))
        .catch(error => {
            console.log(error);
            res.status(400).json({ error })
        });

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
    if (req.body.message) {
        const commentToCreate = Comment.build({
            postId: req.params.id,
            comment: req.body.message,
            createurId: req.token.id
        });
        commentToCreate.save()
            .then(() => res.status(201).json({ message: 'Commentaire enregistré !' }))
            .catch(error => res.status(400).json({ error }))
    } else {
        return res.status(405).json({ message: "Le commentaire est vide" });
    }
};

exports.findCommentForOnePost = (req, res, next) => {
    Comment.findAll({
            where: { postId: req.params.id },
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

exports.likeOnePost = (req, res, next) => {
    console.log("tu es la");
    likesSchema.findOne({
            where: {
                [Op.and]: [{ createurId: req.token.id }, { postId: req.params.id }]
            }
        })
        .then((thisLike) => {
            console.log(thisLike);
            if (thisLike !== null) {
                likesSchema.destroy({
                        where: {
                            [Op.and]: [{ createurId: req.token.id }, { postId: req.params.id }]
                        }
                    })
                    .then(() => res.status(201).json({ message: 'Like supprimé !' }))
                    .catch(error => res.status(400).json({ error: "erreur suppression like" }))

            } else {
                const likeToCreate = likesSchema.build({
                    liked: true,
                    postId: req.params.id,
                    createurId: req.token.id
                });
                likeToCreate.save()
                    .then(() => res.status(201).json({ message: 'Like enregistré !' }))
                    .catch(error => res.status(400).json({ error: "erreur save like" }))
            }
        })
        .catch(error => res.status(400).json({ error: "erreur findone" }));
};