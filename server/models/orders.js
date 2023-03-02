const mongoose = require("mongoose")

const ordersSchema = new mongoose.Schema({
  receiverAddress: { type: String, require: true },
  senderAddress: { type: String, required: true },
  receiverName: { type: String, required: true },
  receiverPhoneNumber: { type: Number, required: true },
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  senderId: {type: String, required: true},
  weight: { type: Number, required: true },
  itemDescription: { type: String, required: true },
  pickupDate: { type: Date, required: true },
  pickUpTime: { type: String, required: true }
})

const Orders = mongoose.model('Orders', ordersSchema)

module.exports = Orders