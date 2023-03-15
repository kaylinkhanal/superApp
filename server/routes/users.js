const express = require('express')
const router = express.Router()

const loginControllers = require('../controllers/loginControllers')
const registerController = require('../controllers/registerControllers')

router.post('/register', registerController.registerUser)

router.post('/login', loginControllers.Login)

module.exports = router
