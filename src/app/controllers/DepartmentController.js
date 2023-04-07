const Department = require('../models/Department');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
var bodyParser = require('body-parser');
const { use } = require('../../routes/user');
const User = require('../models/User');

class DepartmentController {
    // [GET]/user/

    listDepartment(req, res, next) {
        Department.find({})
            .then((department) => {
                res.json(department);
            })
            .catch(next);
    }

    // [POST]/salary/create
    async createDepartment(req, res, next) {
        const formDepartment = req.body;
        const department = new Department(formDepartment);

        await department
            .save()
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json('Thêm không thành công, lỗi server');
            });
    }

    // [DELETE]/salary/:id/update
    async updateDepartment(req, res, next) {
        try {
            const { _id, ...updateData } = req.body;

            if (!_id) {
                return res.status(400).json({ message: 'Không tìm thấy ID Department' });
            }
            await Department.updateOne({ _id }, updateData)
                .then(() => {
                    res.status(200).json('Sửa thành công');
                })
                .catch((err) => {
                    return res.status(500).json({ message: 'Lỗi server khi sửa', error: err.message });
                });
        } catch (err) {
            return res.status(500).json({ message: 'Lỗi server khi sửa', error: err.message });
        }
    }

    // [DELETE]/salary/:id/delete
    async deleteDepartment(req, res) {
        try {
            const department = await Department.deleteOne({ _id: req.params.id });
            if (!department) {
                res.status(404).json('Không tìm thấy department với _id tương ứng.');
            }
            res.status(204).send('Thành công');
        } catch (error) {
            console.log(error);
            res.status(500).json('Xóa không thành công, lỗi server');
        }
    }

    async employeeDepartment(req, res, next) {
        console.log(req.params._id);
        await Department.findOne({ _id: req.params.id })
            .then((department) => {
                if (!department) {
                    throw new Error('Department not found');
                }
                const departmentId = department._id;
                return User.find({ departmentID: departmentId }).exec();
            })
            .then((users) => {
                res.json(users);
            })
            .catch((err) => {
                console.error(err);
                next(err);
            });
    }

    async findOneDepartment(req, res, next) {
        let data = await roleService.findRoleById(req.params.id);
        res.status(200).json(data);
    }
}

module.exports = new DepartmentController();
