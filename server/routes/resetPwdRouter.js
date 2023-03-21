const express = require('express')
const router = new express.Router()
const Users = require('../models/users')
const nodemailer = require('nodemailer')
require('dotenv').config()
const bcrypt = require('bcrypt')
const saltRounds = 10

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

router.post('/users', async (req, res) => {
  // console.log(req.body);
  const email = req.body.email
  const randomOtpCode = Math.ceil(Math.random() * 918376)
  await Otps.create({ otp: randomOtpCode })

  // console.log("Fronted:", email);

  try {
    const data = await Users.findOne({ email })
    console.log(data)
    if (data) {
      if (email == data.email) {
        console.log('Email exists')

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
          subject: 'Reset your Social App password', // Subject line
          text: 'Reset your password.', // plain text body
          html: `<h>Reset your Social App password</h><b>Your 2FA Code is ${randomOtpCode}</b> ` // html body
        }

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Error', error)
          } else {
            console.log('Email sent!' + info.respoonse)
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
      res.status(400).json({ msg: 'Something went wrong.' })
    }
  } catch (e) {
    console.log('Error:', e)
  }
})

router.post('/otps', async (req, res) => {
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
})

router.put('/users', async (req, res) => {
  console.log(res.body)
  bcrypt.hash(req.body.password, saltRounds).then(async function(hash) {
    req.body.password = hash
    const updateData = await Users.findByIdAndUpdate(
      req.body._id,
      req.body.password
    )
    if (updateData) {
      res.status(200).json({
        msg: 'Password Successfully updated.'
      })
    }
  })
})

module.exports = router
