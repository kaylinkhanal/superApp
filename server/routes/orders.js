const express = require('express');
const router = express.Router()
const Orders = require("../models/orders")
router.post('/orders', async (req, res) => {
  try {
    //condt newOrders = await Orders.create(req.body)
    const newOrders = new Orders(req.body);
    await newOrders.save().then(data => {
      if (data) {
        res.status(200).json({ message: "Your Order is on the way" })
      }
    })
  } catch (err) {
    console.log("err" + err)
    res.status(500).json({ message: err })
  }
})

router.get('/orders', async (req, res) => {
  try {
    const ordersList = await Orders.find()
    if (ordersList) {
      res.status(200).json({ ordersList })
    }
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

router.get('/orders/:senderId', async (req, res) => {
  try {
    console.log(req.query.size, 'size')
    console.log(req.query.page, 'page')
    const skipItems = req.query.size * (req.query.page - 1)
    //we find all the orders for that particular user who requested the orders list 

    let totalOrders = await Orders.find({ senderId: req.params.senderId }).count()

    totalOrders = Math.ceil(totalOrders / req.query.size)
    console.log(totalOrders)
    const ordersList = await Orders.find({ senderId: req.params.senderId }).limit(req.query.size).skip(skipItems)

    if (ordersList) {
      res.json({ ordersList, totalOrders })
    }
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

router.put('/orders', async (req, res) => {
  try {
    //we find all the orders for that particular user who requested the orders list 
    const updateData = await Orders.findByIdAndUpdate(req.body._id, req.body)
    if (updateData) {
      res.status(200).json({
        message: 'updated data'
      })
    }
  } catch (err) {
    res.status(500).json({ message: err })
  }
})
module.exports = router;