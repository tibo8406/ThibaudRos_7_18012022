const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/postsControllers');
const multer = require('../middlewares/multerMiddleware');

router.get('/', postsCtrl.showAllPosts);
router.post('/', multer, postsCtrl.createOnePost);

module.exports = router;