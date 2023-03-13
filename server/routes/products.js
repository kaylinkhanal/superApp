const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const saltRounds = 10
const Products = require('../models/products')

router.post('/products', async (req, res) => {
  try {
    await Products.create(req.body)
  } catch (err) {
    console.log('err' + err)
  }
})

router.get('/products', async (req, res) => {
  try {
    const productList =  await Products.find()
    res.json({
      productList
    })
  } catch (err) {
    console.log('err' + err)
  }
})


module.exports = router
