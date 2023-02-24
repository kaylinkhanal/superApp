const express = require('express')
const cors = require('cors')
// modules vs commonjs
const app = express()
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const checkFieldType = require('./utils/checkFieldType')
const connectDb = require('./db/connectDb')

const saltRounds = 10;
require('dotenv').config()
const Orders = require('./model/orders')
const Users = require('./model/users')
app.use(cors())
app.use(express.json())


const port = 5000


app.get('/', (req, res) => {
  res.send('Inital setup')
})



connectDb()







app.post('/register', async (req, res) => {
  try {
    //we generate hash(encrpyted password) using bcrypt 
    // check https://github.com/kelektiv/node.bcrypt.js#:~:text=(myPlaintextPassword%2C-,saltRounds,-).then
    bcrypt.hash(req.body.password, saltRounds).then(async function (hash) {
      //we set passowrd as new hashed password and save it into db using Save or create
      req.body.password = hash
      const data = await Users.create(req.body)
      if (data) {
        res.json({
          message: "Registration successful!!"
        })
      } else {
        res.send('Regsitration failed')
      }
    });
  } catch (err) {
    console.log("err" + err)
  }
})


app.post('/orders', async (req, res) => {
  try {
    // getting values from client
    const { receiverAddress, senderAddress, receiverName, receiverPhoneNumber, itemName, category, weight, itemDescription, pickupDate, pickUpTime } = req.body
    // check if all fields are entered
    if (!(receiverAddress && senderAddress && receiverName && receiverPhoneNumber && itemName && category && weight && itemDescription && pickupDate && pickUpTime)) {
      res.status(400).json({ message: "All fields are required" })
    }
    // if all fields are valid and filled
    else {
      const newOrders = new Orders({ receiverAddress, senderAddress, receiverPhoneNumber, itemName, category, weight, itemDescription, pickupDate, pickUpTime });
      const Order = await newOrders.save()
      if (Orders) {
        console.log('order is placed')
        res.status(200).json({ messages: "Your Order is on the way" })
      }
      else {
        console.log('try again')
        res.status(400).json({ messages: "Try Again" })
      }
    }

  } catch (err) {
    console.log("err" + err)
    res.status(500).json({ message: "Something went wrong" })
  }
})

app.post('/login', async (req, res) => {
  const loginKey = checkFieldType(req.body.loginKey)
  //first we need check if the req.body.loginKey exist in the db
  const data = await Users.findOne({ [loginKey]: req.body.loginKey })
  //if data is there, it means we found a document in db with that particular phoneNumber
  if (data) {
    //we now compare the password(bcrypt lib decypts and compares itself) in db with the one we typed in UI
    bcrypt.compare(req.body.password, data.password, function (err, result) {
      if (result) {
        res.json({
          message: "Login Success!!"
        })
      } else {
        res.json({
          message: "Invalid Password!"
        })
      }
    });
  } else {
    res.json({
      message: "user doesn't exist"
    })
  }
})

// all order
app.get('/orders', async (req, res) => {
  const orders = await Orders.find()
  res.send(orders)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})