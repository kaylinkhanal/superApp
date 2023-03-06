const express=require('express')
const router=express.Router()
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
      //we find all the orders for that particular user who requested the orders list 
      const ordersList = await Orders.find({ senderId: req.params.senderId })
      if (ordersList) {
        res.json({
          ordersList
        })
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

  router.delete('/orders/:id', async (req, res) => {
    console.log(req.params.id)
    try{
      const deleteOrder = await Orders.findByIdAndDelete(req.params.id)
      if(deleteOrder){
        res.json({
          message: "Order deleted"
        })
      }
    }catch(err){
      console.log(err)
    }
  
  })
  
  module.exports=router;