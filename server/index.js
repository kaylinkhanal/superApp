const express = require('express')
const cors = require('cors')
// modules vs commonjs
const app = express()

require('dotenv').config()

const ordersRouter = require('./routes/orders')
const usersRouter = require('./routes/users')
const productsRouter = require('./routes/products')


app.use(cors())
app.use(express.json())
app.use('/', ordersRouter)
app.use('/', usersRouter)
app.use('/', productsRouter)

const connectDb = require('./db/connectDb')
connectDb()
const port = process.env.PORT

require('dotenv').config()



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
