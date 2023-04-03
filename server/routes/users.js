const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.post('/register', userController.PostRegister)

router.post('/login', userController.PostLogin)

router.post('/users', userController.PostGetOtp)

router.post('/otps', userController.VerifyOtp)

router.put('/users', userController.ModifyPassword)

module.exports = router
