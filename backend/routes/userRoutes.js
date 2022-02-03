const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userControllers');
//const checkLogPw = require('../middlewares/checkLoginAndPassword');

router.post('/signup', userCtrl.signup);
router.post('/login', /*checkLogPw.checkLoginAndPassword*/ userCtrl.login);
//router.get('/logout', userCtrl.logout);

module.exports = router;