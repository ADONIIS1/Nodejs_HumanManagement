const express = require('express');
const router = express.Router();
const roleController = require('../app/controllers/RoleController');

//const isAuth = require('../app/middleware/auth')

router.post('/create', roleController.createRole);
router.post('/update', roleController.update);
router.post('/delete', roleController.delete);
router.get('/details', roleController.details);
router.post('/addPermissionstoRole', roleController.addPermissionstoRole);
router.get('/getAll', roleController.getAll);
router.get('/getById/:id', roleController.getById);
router.get('/getAllPermission', roleController.getAllPermission);

module.exports = router;
