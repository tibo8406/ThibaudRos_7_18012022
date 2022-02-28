const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/postsControllers');
const multer = require('../middlewares/multerMiddleware');

router.get('/', postsCtrl.showAllPosts);
router.post('/', multer, postsCtrl.createOnePost);
router.post('/:id/like', postsCtrl.likeOnePost);
router.post('/:id/comment', postsCtrl.commentOnePost);
//router.get('/comment', postsCtrl.findCommentForOnePost); // retirer cette route, la passer directement dans la route /



module.exports = router;