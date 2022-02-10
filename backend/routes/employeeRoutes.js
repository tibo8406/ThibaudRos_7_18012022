const express = require('express');
const router = express.Router();
const employeeCtrl = require('../controllers/employeeControllers');
const multer = require('../middlewares/multerMiddleware');
const multerUserPic = require('../middlewares/multerUserPictureMiddleware');

//const checkLogPw = require('../middlewares/checkLoginAndPassword');

router.get('/:id', employeeCtrl.findOneEmployee);
router.put('/:id', multerUserPic, employeeCtrl.updateEmployeeAccount);
router.get('/', employeeCtrl.showAllEmployees);
//router.post('/login', /*checkLogPw.checkLoginAndPassword*/ userCtrl.login);

module.exports = router;