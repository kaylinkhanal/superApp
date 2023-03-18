const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.post('/register', userController.PostRegister)

router.post('/login', userController.PostLogin)

module.exports = router
