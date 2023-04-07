const express = require('express');
const router = express.Router();

const salaryController = require('../app/controllers/SalaryController');



router.get('/getAll', salaryController.listSalary)
router.post('/create', salaryController.createSalary)
router.delete('/:id/delete', salaryController.deleteSalary)
router.post('/update', salaryController.updateSalary)
router.get('/search', salaryController.search)



module.exports = router;

