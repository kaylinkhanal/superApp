const mongoose = require("mongoose")
// const Users = require("../models/users")

const ordersSchema = new mongoose.Schema({
  receiverAddress: { type: String, require: true },
  senderAddress: { type: String, required: true },
  receiverName: { type: String, required: true },
  receiverPhoneNumber: { type: Number, required: true },
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  senderDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  weight: { type: Number, required: true },
  itemDescription: { type: String, required: true },
  pickupDate: { type: Date, required: true },
  orderStatusId: { type: Number, default: 0 },
  pickUpTime: { type: String, required: true },
  senderCoordinates: { type: Object, required: true },
  receiverCoordinates: { type: Object, required: true },
  ordersImageName: { type: String },
  distance: { type: mongoose.Types.Decimal128 },
  price: { type: Number }
})

const Orders = mongoose.model('Orders', ordersSchema)

module.exports = Orders