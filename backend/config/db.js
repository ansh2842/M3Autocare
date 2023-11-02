const mongoose = require('mongoose');

const connectDB = async() => {

    try{
        await mongoose.connect('mongodb://0.0.0.0:27017/m3care',{ useNewUrlParser: true, useUnifiedTopology: true});
        console.log("successfully connected")
    }catch(error){
      console.log(error)
    }
    
}

module.exports = connectDB; 


