const express = require('express')
const cors = require('cors')
// modules vs commonjs
const app = express()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users =  require("./models/users")
const Orders =  require("./models/orders")

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










app.post('/register', async (req, res) => {
  try{
  //we generate hash(encrpyted password) using bcrypt 
  // check https://github.com/kelektiv/node.bcrypt.js#:~:text=(myPlaintextPassword%2C-,saltRounds,-).then
  bcrypt.hash(req.body.password, saltRounds).then(async function(hash) {
    //we set passowrd as new hashed password and save it into db using Save or create
   req.body.password = hash
       const data =  await Users.create(req.body)
    if(data){
      res.json({
        message: "Registration successful!!"
      })
    }else{
      res.send('Regsitration failed')
    }
  });
  }catch(err){
    console.log("err"+err)
  }
})  




app.post('/orders', async (req, res) => {
  try{
   //create a orders object/document using Orders model and save it to the database here

  }catch(err){
    console.log("err"+err)
  }
})  

const generateToken =async(key, value)=> {
  try{
    /* [key]: value 
    payload with be something like this(example only):
     username: ram
     email: ram@gmail.com
     phoneNumber: 9843400002

     based on this payload + secret key we generate a token and return it back
    */
    const token = await jwt.sign({ [key]: value }, process.env.SECRET_KEY)
    return token
  }catch(err){
    console.log(err)
  }

}

app.post('/login', async (req, res) => {
  const fieldKey =  checkFieldType(req.body.loginKey)
  const token = generateToken(fieldKey, req.body.loginKey)
  //first we need check if the req.body.loginKey's value exist in the db 
  const data = await Users.findOne({[fieldKey]: req.body.loginKey})
  //if data is there, it means we found a document in db with that particular phoneNumber
  if(data){
    //we now compare the password(bcrypt lib decypts and compares itself) in db with the one we typed in UI
    bcrypt.compare(req.body.password, data.password, function(err, result) {
        if(result){
          res.json({
            message: "Login Success!!",
            token
          })
        }else{
          res.status(401).json({
            message: "Wrong Password"
          })
        }
    });
  }else{
    res.status(403).json({
      message: "Invalid credentials"
    })
  }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})