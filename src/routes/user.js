const express = require('express');
const router = express.Router();
const isAuth = require('../app/middleware/auth')
const userController = require('../app/controllers/UserController');

router.get('/getAll', userController.listuser);
router.delete('/:id/delete', userController.deleteUser);
router.post('/update/', userController.updateUser);
router.put('/:id/ban', userController.banUser);
router.put('/:id/unBan', userController.unBanUser);
router.get('/getCurrentUser',isAuth.isAuth, userController.getCurrentUser);
router.get('/getById/:id', userController.getById);
router.post('/addRolestoUser', userController.addRolestoUser);

module.exports = router;
