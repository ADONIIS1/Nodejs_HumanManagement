
const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/authController');

const isAuth = require('../app/middleware/auth')
router.post('/register', authController.register)
router.get('/getCurrentUser',isAuth.isAuth,isAuth.isAuthorize(['TEST2.TEST123122']),authController.getCurrentUser);
router.get('/checkAuth',isAuth.isAuth,authController.checkAuth);
// router.get('/authorzied',isAuth.isAuth,isAuth.isAuthorize(['zxczxc']),authController.checkAuthorize);
router.post('/login',authController.login)
router.get('/refreshtoken',authController.refreshToken);
router.post('/addRolestoUser',authController.addRolestoUser);
// router.get('/details',authController.getPermissionsByEmail);
// router.get('/lstUser',authController.getlstUser);

module.exports = router;