const express = require('express')
const bcrypt = require('bcrypt')
const saltRounds = 10
const checkFieldType = require('../utils/checkFieldType')
const Users = require('../models/users')
const GenerateJwt = require('../utils/generateJwt')
const router = new express.Router()
const nodemailer = require('nodemailer')
require('dotenv').config()

const PostRegister = async (req, res) => {
  try {
    const dupUser = await Users.find({ email: req.body.email, phoneNumber: req.body.phoneNumber, userName: req.body.userName });
    console.log(dupUser)
    if (dupUser) {
      res.status(409).json({
        errmsg: "User already exist. Please use unique	email, phoneNumber, username",
      });
    } else {
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
    }

  } catch (err) {
    console.log('err' + err)
  }
}

const PostLogin = async (req, res) => {
  try {
    const fieldKey = checkFieldType(req.body.loginKey)
    const token = GenerateJwt(fieldKey, req.body.loginKey)
    //first we need check if the req.body.loginKey's value exist in the db
    const data = await Users.findOne({
      [fieldKey]: req.body.loginKey
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
            userRole: data.userRole
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
}
/////////////////////////////////
const mongoose = require('mongoose')
// const { Schema } = mongoose;
const otpSchema = new mongoose.Schema(
  {
    otp: {
      type: Number
    }
  },
  { timestamps: true }
)
const Otps = mongoose.model('Otps', otpSchema)
////////////////////////////////////////

const PostGetOtp = async (req, res) => {
  // console.log(req.body);
  const email = req.body.email
  const randomOtpCode = Math.ceil(Math.random() * 918376)
  await Otps.create({ otp: randomOtpCode })

  try {
    const data = await Users.findOne({ email })

    if (data) {
      if (email == data.email) {
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
          }
        })

        const mailOptions = {
          from: '08902c3a9e8db0', // sender address
          to: email, // list of receivers
          subject: 'Reset your Super App password', // Subject line
          text: 'Reset your password.', // plain text body
          html: `<h>Reset your Super App password.</h><br><h>Your 2FA Code is <h><h1  style="color:#5A0047;">${randomOtpCode}</h1> ` // html body
        }

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Error', error)
          } else {
            console.log('Email sent!' + info.response)
            res.status(201).json({ status: 201, info })
          }
        })

        res.status(200).json({
          msg: 'Password reset OTP sent to email.',
          dbUserId: data._id
        })
      } else {
        res.status(401).json({ msg: "The email address doesn't exist" })
      }
    } else {
      res.status(400).json({ msg: 'Email address does not exist.' })
    }
  } catch (e) {
    console.log('Error:', e)
  }
}

const VerifyOtp = async (req, res) => {
  console.log(req.body)
  const data = await Otps.findOne({
    otp: req.body.otp
  })
  if (data) {
    console.log(data)
    res.status(200).json({
      msg: 'OTP is successfully verified.'
    })
  }
}

const ModifyPassword = async (req, res) => {
  // console.log(req.body)
  bcrypt.hash(req.body.password, saltRounds).then(async function (hash) {
    // console.log(req.body.password, req.body._id)
    req.body.password = hash
    // console.log(req.body.password, hash)

    const updateData = await Users.findByIdAndUpdate(req.body._id, req.body)
    if (updateData) {
      res.status(200).json({
        msg: 'Password updated.'
      })
    }
  })
}

exports.PostRegister = PostRegister
exports.PostLogin = PostLogin
exports.PostGetOtp = PostGetOtp
exports.VerifyOtp = VerifyOtp
exports.ModifyPassword = ModifyPassword
