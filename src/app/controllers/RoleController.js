const roleService = require('../Services/roleServices');
const roleValidator = require('../validator/RoleValidator');
const permissionService = require('../Services/permissionServices');
const { response } = require('express');

class RoleController {
    createRole = async (req, res) => {
        try {
            const formRole = req.body;
            const doesNameRole = await roleValidator.RoleNameExists(formRole.name);
            if (doesNameRole) {
                const RoleId = await roleService.create(req); // Create Role
                const data = await roleService.getPermissionByRole(RoleId);
                //const data_per = await permissionService.create(lstPermission);
                res.status(201).json(data);
                // req.body.permissions = lstPermission(formRole.name)
                // res.status(201).json(
                //     await roleService.create(req)
                // );
            }
        } catch (error) {
            res.status(400).json(error.message);
        }
    };

    update = async (req, res) => {
        const formRole = req.body;
        const doesNameRole = await roleValidator.RoleNameExistsUpdate(formRole._id,formRole.name);
        if (doesNameRole) {
            await roleService.updateRole(req.body).then(response => {
                res.status(200).json(response)
            })
        }
        
    };

    delete = async (req, res) => {
        await roleService.delete();
        res.status(200).json('Delete All');
    };

    getRolesbyUser = async (req, res) => {};

    details = async (req, res) => {
        let data = await roleService.getPermissionByRole(req.body.id);
        res.status(200).json(data);
    };

    addPermissionstoRole = async (req, res) => {
        let dataRole = await roleService.addPermissionstoRole(req.body.id, req.body.permissions);
        let dataPermission = await roleService.UpdateRoleByPermission(req.body.id, req.body.permissions);
        res.status(200).json({
            Role: dataRole,
            Pemissions: dataPermission,
        });
    };

    getAll = async (req, res) => {
        let data = await roleService.findAll();
        res.status(200).json(data);
    };
    getById = async (req, res) => {
        let data = await roleService.findRoleById(req.params.id);
        res.status(200).json(data);
    };
    getAllPermission = async (req, res) => {
        let data = await permissionService.findAll();
        res.status(200).json(data);
    };
}

module.exports = new RoleController();
