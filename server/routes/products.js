const express = require('express')
const router = express.Router()
const productController = require('../controllers/producController')

router.post('/products', productController.PostProduct)

router.get('/products', productController.GetProduct)

module.exports = router
