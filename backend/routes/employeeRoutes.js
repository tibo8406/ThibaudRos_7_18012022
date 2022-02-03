const express = require('express');
const router = express.Router();
const employeeCtrl = require('../controllers/employeeControllers');
//const checkLogPw = require('../middlewares/checkLoginAndPassword');

router.get('/:id', employeeCtrl.findOneEmployee);
router.get('/', employeeCtrl.showAllEmployees);
//router.post('/login', /*checkLogPw.checkLoginAndPassword*/ userCtrl.login);

module.exports = router;