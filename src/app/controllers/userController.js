const User = require('../models/User');
const userService = require('../Services/userServices')
const roleService = require('../Services/roleServices')
const bcryptjs = require('bcryptjs')

class UserController {
    // [GET]/user/

    listuser = async (req, res, next) =>{
        await User.find({})
        .populate({
            path : "roles",
            select : "name"
        })

            .then((users) => {
                res.status(200).json(users);
            })
    }
    getCurrentUser = async (req,res) =>{
        const token = req.headers.authorization;
        const data = await userService.getCurrentUser(token);

        return res.status(200).json(data);
    }
    // [POST]/user/create

    async updateUser(req, res, next) {
        try {
            const { _id, ...updateData } = req.body;
            updateData.password = await bcryptjs.hash(formUser.password, 10);
            if (!_id) {
                return res.status(400).json({ message: 'Không tìm thấy ID người dùng' });
            }
            await User.updateOne({ _id }, updateData)
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

    // [DELETE]/user/:id/delete
    async deleteUser(req, res) {
        try {
            const user = await User.deleteOne({ _id: req.params.id });
            if (!user) {
                res.status(404).json('Không tìm thấy user với _id tương ứng.');
            }
            res.status(204).send('thành công');
        } catch (error) {
            console.log(error);
            res.status(500).json('Xóa không thành công, lỗi server');
        }
    }
    getById = async (req,res) => {
        await userService.findUserById(req.params.id).then(r => {
            res.status(200).json(r);
        })
    }
    async banUser(req, res) {
        try {
            const result = await User.updateOne({ _id: req.params.id }, { active: false });
            if (result.nModified === 0) {
                res.status(404).json('Không tìm thấy user với _id tương ứng.');
            } else {
                res.status(204).send('Thành công');
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(' không thành công, lỗi server');
        }
    }

    async unBanUser(req, res) {
        try {
            const result = await User.updateOne({ _id: req.params.id }, { active: true });
            if (result.nModified === 0) {
                res.status(404).json('Không tìm thấy user với _id tương ứng.');
            } else {
                res.status(204).send('Thành công');
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(' không thành công, lỗi server');
        }
    }

    addRolestoUser = async (req, res) => {
        let dataUser = await userService.addRolestoUser(req.body._id, req.body.roles);
        let dataRole = await roleService.UpdateRoleByUser(req.body._id, req.body.roles);
        res.status(200).json({
            Role: dataUser,
            Pemissions: dataRole,
        });
    };
}

module.exports = new UserController();
