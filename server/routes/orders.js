const express = require('express')
const router = express.Router()

const OrderController = require('../controllers/orderControllers')

router.post('/orders', OrderController.PostOrder)

router.get('/orders', OrderController.GetOrder)

router.get('/orders/:senderId', OrderController.GetOrderSenderID)

router.put('/orders', OrderController.PutOrder)

router.delete('/orders/:id', OrderController.DeleteOrder)

module.exports = router
