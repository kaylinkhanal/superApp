const express = require('express')
const router = express.Router()

const orderControllers = require('../controllers/orderController')

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/src/uploads')
  },
  filename: function (req, file, cb) {
    cb(
      null,
      req.body.senderId +
        '_' +
        Math.ceil(Math.random() * 123232) +
        '.' +
        file.mimetype.split('/')[1]
    )
  },
})

const upload = multer({ storage: storage })

router.post('/orders', upload.single('orderImage'), orderControllers.PostOrders)

router.get('/orders', orderControllers.GetOrders)

router.get('/orders/:senderId', orderControllers.GetOrdersSenderID)

router.put('/orders', orderControllers.PutOrders)

router.delete('/orders/:id', orderControllers.DeleteOrders)

module.exports = router
