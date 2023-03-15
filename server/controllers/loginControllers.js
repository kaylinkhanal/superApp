const Users = require('../models/users')
const bcrypt = require('bcrypt')
const GenerateJwt = require('../utils/generateJwt')
const checkFieldType = require('../utils/checkFieldType')

const Login = async (req, res) => {
  try {
    const fieldKey = checkFieldType(req.body.loginKey)
    const token = GenerateJwt(fieldKey, req.body.loginKey)
    //first we need check if the req.body.loginKey's value exist in the db
    const data = await Users.findOne({
      [fieldKey]: req.body.loginKey,
      // userRole: req.body.userRole
    })
    //if data is there, it means we found a document in db with that particular phoneNumber
    if (data) {
      //we now compare the password(bcrypt lib decypts and compares itself) in db with the one we typed in UI
      bcrypt.compare(req.body.password, data.password, function (err, result) {
        if (result) {
          res.json({
            message: 'Login Success!!',
            token,
            id: data._id,
            userRole: data.userRole,
          })
        } else {
          res.status(401).json({
            message: 'Wrong Password',
          })
        }
      })
    } else {
      res.status(403).json({
        message: 'Invalid credentials',
      })
    }
  } catch (err) {
    console.log(err)
  }
}
exports.Login = Login
