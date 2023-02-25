const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  receiverName: { type: String },
  receiverAddress: { type: String, required: true },
  senderAddress: { type: String },
  receiverPhoneNumber: { type: String },
  itemName: { type: String },
  category: { type: String },
  weight: { type: Number },
  itemDiscriptions: { type: String },
  pickupDate: { type: String },
  pickupTime: { type: String },
  acceptedTerms: { type: Boolean },
});
const Orders = mongoose.model("Orders", orderSchema);
module.exports = Orders;

// receiverAddress: 'Pathivara Khana and Khaja Ghar, Munibhairab Marg, Subidhanagar, Kathmandu 44703, Nepal',
//   senderAddress: 'Sadhavab Pharma, Shri Ganesh Marg, Subidhanagar, Kathmandu 44703, Nepal',
//   receiverName: 'katie',
//   receiverPhoneNumber: '1234567890',
//   itemName: 'jacket',
//   category: 'Clothing',
//   weight: 10,
//   itemDescription: 'This a wonderful jacket for my brother. ',
//   pickupDate: '2023-02-01',
//   pickUpTime: 'Afternoon',
//   acceptedTerms: true
// }
