const Role = require('../models/Role')
const buildObject = require('../utils/buildObject')


class RoleValidation{
    RoleNameExists = (name = '') => {
        return new Promise((resolve, reject) => {
            Role.findOne(
            {
              name : name
            },
            (err, item) => {
              if (err) {
                // Input is not correct format
                return reject(buildObject.buildErrObject(422, err.message))
              }
              if (item) {
                // Bad Request
                return reject(buildObject.buildErrObject(400, 'Role Name is already exists'))
              }
              // return true if pass validate
              resolve(true) 
            }
          )
        })
    }
    RoleNameExistsUpdate = async (id = '',name = '') => {
      return new Promise(async (resolve, reject) => {
        
      })
  }
}
module.exports = new RoleValidation