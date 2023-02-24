const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  receiverAddress: { type: String, required: true },
  senderAddress: { type: String },
  receiverPhoneNumber: { type: String },
})
const Orders = mongoose.model('Orders', orderSchema);
module.exports = Orders



