const express = require('express')
const cors = require('cors')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
  cors: {
    origin: "*"
  }
});

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
io.on('connection', (socket) => {
  socket.on('greetings',(greetings)=> {
    console.log(greetings)
    // //broadcast
    // io.emit('greetings','hello')
  })
 
  console.log('a user connected');
});

const port = process.env.PORT

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
