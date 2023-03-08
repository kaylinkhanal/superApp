const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  userName: { type: String },
  email: { type: String },
  phoneNumber: { type: Number },
  vehicleType: {type: String},
  vehicleNumber: {type: String},
  userRole: {type: String},
  address: { type: String },
  password: { type: String }
})
const Users = mongoose.model('Users', userSchema);
module.exports = Users