const asyncHandler = require('express-async-handler');
const otpModel = require('../userModel/userOtpModel');

exports.checkOTPs = asyncHandler(async (req, res) => {
  const { otps } = req.body;

  try {
    const otp = await otpModel.findOne({ otp: otps});
    if (otp) {
      
      const currentTimestamp = Date.now();
  
      
      const otpTimestamp = otp.timestamp;
      const timeDifference = currentTimestamp - otpTimestamp;
      
      if (timeDifference <= 30000) { 
        res.json({ message: 'OTP is valid' });
      } else {
        res.status(400).json({invalid:true, error: 'OTP has expired' });
      }
    } else {
      res.status(404).json({invalid:true, error: 'OTP not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({invalid:true, error: 'Internal server error' });
  }
});
