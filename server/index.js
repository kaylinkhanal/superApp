const express = require('express')
const cors = require('cors')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});
const Orders = require('./models/orders')

require('dotenv').config()
const ordersRouter = require('./routes/orders')
const usersRouter = require('./routes/users')

app.use(cors())
app.use(express.json())
app.use('/', ordersRouter)
app.use('/', usersRouter)
const connectDb = require('./db/connectDb');
const { findByIdAndUpdate } = require('./models/orders');
connectDb()
io.on('connection', (socket) => {
  socket.on('orderStatus', async (orderStatus) => {
    console.log(orderStatus)
    const updateData = await Orders.findByIdAndUpdate(orderStatus._id, { orderStatusId: orderStatus.orderStatusId + 1 })
  })

  console.log('a user connected');
});

const port = process.env.PORT

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
