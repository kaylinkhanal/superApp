const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: { type: String, required: true },
    userName: { type: String },
    email: { type: String },
    phoneNumber: { type: Number },
    address: { type: String },
    password: { type: String },
    token: { type: String },    
})
const Users = mongoose.model('Users', userSchema);

module.exports = Users