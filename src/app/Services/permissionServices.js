const Permission = require('../models/Permission');
const buildObject = require('../utils/buildObject');
const lstPermission = [
    { name: `Degree`, display: `Bằng Cấp` },
    { name: `Degree.VIEW`, display: 'Giao diện' },
    { name: `Degree.CREATE`, display: 'Thêm' },
    { name: `Degree.UPDATE`, display: 'Sửa' },
    { name: `Degree.DELETE`, display: 'Xóa' },
    { name: `Salary`, display: `Lương` },
    { name: `Salary.VIEW`, display: 'Giao diện' },
    { name: `Salary.CREATE`, display: 'Thêm' },
    { name: `Salary.UPDATE`, display: 'Sửa' },
    { name: `Salary.DELETE`, display: 'Xóa' },
    { name: `Department`, display: `Phòng ban` },
    { name: `Department.VIEW`, display: 'Giao diện' },
    { name: `Department.CREATE`, display: 'Thêm' },
    { name: `Department.UPDATE`, display: 'Sửa' },
    { name: `Department.DELETE`, display: 'Xóa' },
    { name: `Blog`, display: `Bảng tin` },
    { name: `Blog.VIEW`, display: 'Giao diện' },
    { name: `Blog.CREATE`, display: 'Thêm' },
    { name: `Blog.UPDATE`, display: 'Sửa' },
    { name: `Blog.DELETE`, display: 'Xóa' },
    { name: `Role`, display: `Quyền` },
    { name: `Role.VIEW`, display: 'Giao diện' },
    { name: `Role.CREATE`, display: 'Thêm' },
    { name: `Role.UPDATE`, display: 'Sửa' },
    { name: `Role.DELETE`, display: 'Xóa' },
    { name: `User`, display: `Người dùng` },
    { name: `User.VIEW`, display: 'Giao diện' },
    { name: `User.CREATE`, display: 'Thêm' },
    { name: `User.UPDATE`, display: 'Sửa' },
    { name: `User.DELETE`, display: 'Xóa' },
];
class PermissionService {
    create = async () => {
        await Permission.deleteMany();
        return new Promise(async (resolve, reject) => {
            await Permission.insertMany(lstPermission, (err, item) => {
                if (err) {
                    reject(buildObject.buildErrObject(422, err.message));
                }
                resolve(item.map((p) => p._id));
            });
        });
    };
    findAll = async () => {
        return new Promise((resolve, reject) => {
            Permission.find({})
                .populate({
                    path: 'roles',
                    select: 'name',
                })
                .then(async (item, err) => {
                    try {
                        if (err) {
                            console.log('Test lỗi' + err.message);
                            reject(buildObject.buildErrObject(404, 'User Not Found'));
                        }
                        resolve(item);
                    } catch (error) {
                        reject(error);
                    }
                });
        });
    };
}

module.exports = new PermissionService();
