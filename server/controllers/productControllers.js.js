const Products = require('../models/products')

const GetProduct = async (req, res) => {
  try {
    const productList = await Products.find()
    res.json({
      productList,
    })
  } catch (err) {
    console.log('err' + err)
  }
}

const PostProduct = async (req, res) => {
  try {
    await Products.create(req.body)
  } catch (err) {
    console.log('err' + err)
  }
}

exports.PostProduct = PostProduct
exports.GetProduct = GetProduct
