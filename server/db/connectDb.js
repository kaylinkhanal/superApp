const mongoose = require('mongoose');
const connectDb = async()=> {
    try{
      const data = await mongoose.connect('mongodb://127.0.0.1:27017/superdb');
      if(data) console.log("connected to monngodb")
    }catch(err){
      console.log("Db Connection error", err)
    }
  }

  module.exports = connectDb