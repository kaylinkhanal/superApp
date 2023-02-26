const mongoose = require('mongoose');
const connectDb = async () => {
  try {
    mongoose.set('strictQuery', true);
    const data = await mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/superdb');
    if (data) console.log("connected to monngodb")
  } catch (err) {
    console.log("Db Connection error", err)
  }
}

module.exports = connectDb