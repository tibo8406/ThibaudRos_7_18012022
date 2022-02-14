const express = require('express');
const router = express.Router();
const employeeCtrl = require('../controllers/employeeControllers');
const multerUserPic = require('../middlewares/multerUserPictureMiddleware');

router.get('/:id', employeeCtrl.findOneEmployee);
router.put('/:id', multerUserPic, employeeCtrl.updateEmployeeAccount);
router.delete('/:id', employeeCtrl.deleteAccount);
router.get('/', employeeCtrl.showAllEmployees);
module.exports = router;