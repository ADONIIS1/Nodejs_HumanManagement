const User = require('../models/User')
const roleService = require('../Services/roleServices')
const buildObject = require('../utils/buildObject')
const bcryptjs = require('bcryptjs')
const tokenService = require('../middleware/token')
const { default: mongoose } = require('mongoose');
const { resolve } = require('path')
const { reject } = require('async')
// Đăng ký vào dữ liệu

class UserService{
  // Đăng ký
    registerUser = async (req = {}) => {
        const formUser = req.body;
        formUser.password = await bcryptjs.hash(formUser.password, 10);
        const user = new User(formUser); 
        user._id = mongoose.Types.ObjectId();
        return new Promise((resolve, reject) => {
            user.save(async (err, item) =>{
              if(err){
                reject(buildObject.buildErrObject(422,err.message))
              }
              const role = await roleService.findRoleByName('USER');
              await User.findByIdAndUpdate(item._id,
              {
                $push : {roles : role._id}
              })
              resolve(item);
            });
            
          });
          
    }
    login = async (email = '') =>{
      const user =  User.findOne({
        email : email,
      })
      console.log(user);
      if(user){
        return new Promise((resolve, reject) => {
          // if(!user){
          //   reject(buildObject.buildErrObject(422,'Not Found user'))
          // }
          resolve(user);
      });
      }
    }
    findUser = (email = '') => {
      return new Promise((resolve, reject) => {
        User.findOne(
          {
            email : email
          },
          async (err, item) => {
            try {
              if(err){
                console.log('Test lỗi'+err.message)
                reject(buildObject.buildErrObject(404,'User Not Found'))
              }
              resolve(item)
            } catch (error) {
              reject(error)
            }
          }
        )
      })
    }
  
    findUserById = (id = '') => {
      return new Promise((resolve,reject) =>{
        User.findById(id, async (err,item) =>{
          try {
            if(!err){
              resolve(item);
            }
            reject(err);
          } catch (error) {
            reject(error);
          }
        })
      })
    }
    getRoleByEmail = async (email = '') => {
      return new Promise(async (resolve,reject) =>{
        await User.
          findOne({email : email}).
          populate({
              path : "roles",
              populate : {path: "permissions"},
              select : "name"
            }).
            then(res =>{
              resolve(res)
            }).catch(err => {
              reject(err)
            });
      })
    }
    getRolesById = async (id = '') => {
      return new Promise(async (resolve,reject) =>{
        await User.
          findById(id).
          populate({
              path : "roles",
              select : "name"
            }).
            then(res =>{
              resolve(res)
            }).catch(err => {
              reject(err)
            });
      })
    }
    getCurrentUser = async (token = '') => {
      return new Promise(async (resolve,reject) => {
          const decodedByToken = 
                await tokenService.verifyToken(token).then(res => {
                    return res;
                }).catch(err =>{
                    return err;
                });
          if(decodedByToken){
             await this.getRoleByEmail(decodedByToken.email)
                      .then(res => {
                        resolve(res);
                      }).catch(err => {
                        reject(err);
                      })
          }
      })
    }
    getlstUser = async () => {
      return new Promise(async (resolve,reject) => {
          await User.find({}).then(res => {
            resolve(res);
          })
      });
    }
    edit = async(id='',user = {}) =>{

    }

    addRolestoUser = async(userId='',roles = []) => {
      return new Promise(async (resolve,reject) => {
        const userJoinRoles = await this.getRolesById(userId)
        await User.findByIdAndUpdate(userId,
          {
            $pullAll : {roles : userJoinRoles.roles}
          }).then(async () => {
            await User.findByIdAndUpdate(userId,{
              $push : {roles : roles}
            })
          })
          const data = await this.getRolesById(userId)
          resolve(data)
      }) 
    }
}

  module.exports = new UserService