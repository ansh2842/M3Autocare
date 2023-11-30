const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  otp: {
    type: Number,
    required: true,
  },
  userId:{
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    expires: 120,
    default: Date.now,
  },
});

const otpSetSchema = new mongoose.model("optVerification", otpSchema);

module.exports = otpSetSchema;
