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

app.use(cors())
app.use(express.json())


const port = 5000


app.get('/', (req, res) => {
  res.send('Inital setup')
})


connectDb()




const userSchema = new Schema({
  fullName: { type: String, required: true },
  userName: { type: String },
  email: { type: String },
  phoneNumber: { type: Number },
  address: { type: String },
  password: { type: String }
})
const Users = mongoose.model('Users', userSchema);





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

const orderSchema = new Schema({
  receiverAddress: { type: String, required: true },
  senderAddress: { type: String },
  receiverPhoneNumber: { type: String },
})
const locationDetails = mongoose.model('locationDetails', orderSchema);


app.post('/orders', async (req, res) => {
  try {
    //create a orders object/document using Orders model and save it to the database here
    const data = await locationDetails.create(req.body)
    console.log(data)
  } catch (err) {
    console.log("err" + err)
  }
})

const orderDetailShema = new Schema({
  acceptedTerms: { type: Boolean, required: true },
  category: { type: String },
  itemDescription: { type: String },
  itemName: { type: String },
  pickUpTime: { type: String },
  pickupDate: { type: Date },
  receiverName: { type: String },
  weight: { type: String },

})
const orders = mongoose.model("order",orderDetailShema)
app.post('/orders/details', async (req, res) => {
  try {
    //create a orders object/document using Orders model and save it to the database here
    const data = await orders.create(req.body)
    console.log(data)
  } catch (err) {
    console.log("err" + err)
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



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})