const mongoose = require("mongoose")

const ordersSchema = new mongoose.Schema({
  receiverAddress: { type: String, require: true },
  senderAddress: { type: String, require: true },
  receiverName: { type: String, require: true },
  receiverPhoneNumber: { type: Number, require: true },
  itemName: { type: String, require: true },
  category: { type: String, require: true },
  weight: { type: Number, require: true },
  itemDescription: { type: String, require: true },
  pickupDate: { type: Date, require: true },
  pickUpTime: { type: String, require: true }
})

const Orders = mongoose.model('Orders', ordersSchema)

module.exports = Orders