const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const saltRounds = 10
const checkFieldType = require('../utils/checkFieldType')
const Users = require('../models/users')
const GenerateJwt = require('../utils/generateJwt')

router.post('/register', async (req, res) => {
  try {
    //we generate hash(encrpyted password) using bcrypt
    // check https://github.com/kelektiv/node.bcrypt.js#:~:text=(myPlaintextPassword%2C-,saltRounds,-).then
    bcrypt.hash(req.body.password, saltRounds).then(async function (hash) {
      //we set passowrd as new hashed password and save it into db using Save or create
      req.body.password = hash
      const data = await Users.create(req.body)
      if (data) {
        res.json({
          message: 'Registration successful!!'
        })
      } else {
        res.send('Regsitration failed')
      }
    })
  } catch (err) {
    console.log('err' + err)
  }
})

router.post('/login', async (req, res) => {
  try {
    const fieldKey = checkFieldType(req.body.loginKey)
    const token = GenerateJwt(fieldKey, req.body.loginKey)
    //first we need check if the req.body.loginKey's value exist in the db
    const data = await Users.findOne({
      [fieldKey]: req.body.loginKey,
      userRole: req.body.userRole
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
            username: data.userName
          })
        } else {
          res.status(401).json({
            message: 'Wrong Password'
          })
        }
      })
    } else {
      res.status(403).json({
        message: 'Invalid credentials'
      })
    }
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
