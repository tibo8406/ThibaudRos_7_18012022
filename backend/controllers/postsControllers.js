const Post = require('../models/postsModel');
const employeeSchema = require('../models/userModel');
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