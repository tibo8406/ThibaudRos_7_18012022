const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
//const checkLogPw = require('../middlewares/checkLoginAndPassword');

router.post('/signup', userCtrl.signup);
router.post('/login', /*checkLogPw.checkLoginAndPassword*/ userCtrl.login);

module.exports = router;