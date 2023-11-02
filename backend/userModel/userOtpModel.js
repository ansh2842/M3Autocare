const mongoose =  require('mongoose');

const otpUserSchema = new mongoose.Schema({

    otp:{
        type:Number,
        required:true,
    },
    timestamp: {
        type: Date,
        expires: 30,
        default: Date.now,
      },


})

const otpSetSchema = new mongoose.model('optUserVerification', otpUserSchema);

module.exports = otpSetSchema;