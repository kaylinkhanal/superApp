const express = require('express')
const app = express()
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