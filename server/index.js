const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose');
const { Schema } = mongoose;
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
 await Users.create(req.body)
})  



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})