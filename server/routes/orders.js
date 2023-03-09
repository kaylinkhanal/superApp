const express=require('express')
const router=express.Router()
const Orders = require("../models/orders")
const {DateTime} = require("luxon")

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
      const skipStartPages = req.query.size * (req.query.page -1)
      let totalItem = await Orders.find().count()
      if(totalItem % req.query.size != 0){
        totalItem = Math.ceil((totalItem / req.query.size))
      }else{
        totalItem = (totalItem / req.query.size) 
      }
      //we find all the orders for that particular user who requested the orders list 
      const ordersList = await Orders.find().skip(skipStartPages).limit(req.query.size)
      res.json({ordersList,totalItem})
    } catch (err) {
      res.status(500).json({ message: err })
    }
  })
  
  router.get('/orders/:senderId', async (req, res) => {
    try {
      const skipStartPages = req.query.size * (req.query.page -1)
      let totalItem = await Orders.find().count()
      if(totalItem % req.query.size != 0){
        totalItem = Math.ceil((totalItem / req.query.size))
      }else{
        totalItem = (totalItem / req.query.size) 
      }
    
      //we find all the orders for that particular user who requested the orders list 
      const ordersList = await Orders.find({ senderId: req.params.senderId }).skip(skipStartPages).limit(req.query.size)
      res.json({ordersList,totalItem})
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