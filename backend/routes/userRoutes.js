const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userControllers');
const checkFormCtrl = require('../middlewares/checkFormMiddleware');

router.post('/signup', checkFormCtrl.checkSignupForm, userCtrl.signup);
router.post('/login', checkFormCtrl.checkLoginForm, userCtrl.login);
//router.get('/logout', userCtrl.logout);

module.exports = router;