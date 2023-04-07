const buildObject = require('../utils/buildObject');
const tokenService = require('./token')
class Auth{
  isAuth = async (req,res,next) => {
    const accessToken = req.headers.authorization;
    if (!accessToken){
      return res.status(401).json('Token không hợp lệ!');
    }
    const verified = await tokenService.verifyToken(accessToken.replace('Bearer ', ''))
                .then((data) => {
                  return data; // return true
    }).catch((err) => {
        return err; // return false
    })
    console.log('Check Token is Accessed : ',verified);
    if(!verified){
      return res.status(401).json('Token không hợp lệ!');
    }
    req.data = verified
    next()
  }
  // isAuthen = async (token = '') => {
  //   if (!token){
  //     return {
  //       status : 401,
  //       data : 'Mời bạn nhập Token'
  //     }
  //   }
  //   const verified = await tokenService.verifyToken(token.replace('Bearer ', ''))
  //               .then( () => true) // return true
  //               .catch( () => false) // return false
  //   console.log('Check Token is Accessed : ',verified);
  //   if(!verified){
  //     return {
  //       status : 401,
  //       data : 'Token không hợp lệ!'
  //     }
  //   }
  //   return verified;
  // }
  isAuthorize = (roles = []) => async (req,res,next) => {
    
      const accessToken = req.headers.authorization;
      const verified = await tokenService.verifyToken(accessToken.replace('Bearer ', ''))
                .then((data) => {
                  return data; // return true
    }).catch((err) => {
        return err; // return false
    })
    console.log('Roles input : ',verified);
    if(!verified){
      return res.status(401).json('Token không hợp lệ!');
    }
    console.log(verified.roles);
      if(verified.roles.find(role => roles.includes(role))){
        next()
      }
      else{
        res.status(403).json('Bạn không có quyền truy cập !')
      }
  }
}

module.exports = new Auth