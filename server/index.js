const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;
require('dotenv').config()
app.use(cors())
app.use(express.json())
const port = 5000


app.get('/', (req, res) => {
  res.send('Inital setup')
})

const connectDb = async()=> {
  try{
    const data = await mongoose.connect('mongodb://127.0.0.1:27017/superdb');
    if(data) console.log("connected to monngodb")
  }catch(err){
    console.log("Db Connection error", err)
  }
}

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
  try{
    const data =  await Users.create(req.body)
    if(data){
      res.send('User Registered Successfully')
    }else{
      res.send('Regsitration failed')
    }
  }catch(err){
    console.log("err"+err)
  }
})  


app.post('/login', async (req, res) => {
  jwt.sign({ name: req.body.userName }, process.env.SECRET_KEY, function(err, token) {
    res.json({
      msg: "token generated",
      token: token
    })
  });
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})