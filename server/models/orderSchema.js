const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    acceptedTerms: { type: Boolean },
    category: { type: String },
    itemWeight: { type: Number },
    itemDescription: { type: String },
    itemName: { type: String },
    pickUpTime: { type: String },
    pickupDate: { type: String },
    receiverAddress: { type: String },
    receiverName: { type: String },
    receiverPhoneNumber: { type: Number },
    senderAddress: { type: String },
    senderName: { type: String },
})
const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders
