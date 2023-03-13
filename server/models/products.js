const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  productName: { type: String },
  category: { type: String },
  price: { type: Number },
})
const Products = mongoose.model('Products', productsSchema);
module.exports = Products