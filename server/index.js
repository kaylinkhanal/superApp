const express = require('express')
const cors = require('cors')
// modules vs commonjs
const app = express()
const mongoose = require('mongoose');
const port = 5000

const connectDb = require('./db/connectDb')
connectDb()

const registerRouter = require('./routes/registerRoute')
const loginRouter = require('./routes/loginRoute')
const orderRouter = require('./routes/ordersRoute')

require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/orders', orderRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})