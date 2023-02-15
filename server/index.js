const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
const port = 5000

app.get('/', (req, res) => {
  res.send('Inital setup')
})


app.post('/register', (req, res) => {
  console.log(req.body)
})  


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})