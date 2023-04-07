const express = require('express');
const router = express.Router();
const departmentController = require('../app/controllers/DepartmentController');

const isAuth = require('../app/middleware/auth');

router.get('/getAll', departmentController.listDepartment);
router.post('/create', departmentController.createDepartment);
router.delete('/:id/delete', departmentController.deleteDepartment);
router.post('/update', departmentController.updateDepartment);
router.get('/:id/employee', departmentController.employeeDepartment);

module.exports = router;
