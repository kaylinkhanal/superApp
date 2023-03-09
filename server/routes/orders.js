const express=require('express')
const router=express.Router()
const Orders = require("../models/orders")
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/src/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.senderId + '_'+ Math.ceil(Math.random()*123232) + '.' + file.mimetype.split('/')[1])
  }
})

const upload = multer({ storage: storage })



router.post('/orders', upload.single('orderImage'), async (req, res) => {
    try {
      //condt newOrders = await Orders.create(req.body)
      const updatedFields = {...req.body, ordersImageName: req.file.filename}
      const newOrders = new Orders(updatedFields);
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
      console.log(err)
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