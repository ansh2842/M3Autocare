const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const userModel = require('../userModel/userModel')
const nodemailer = require('nodemailer');
const OTPmodel =  require('../userModel/userOtpModel');
const emailUsername = 'm3autocare20@gmail.com';
const emailPassword = 'fozbfuwnpjfjfpbr';

exports.userAdds = asyncHandler(async(req,res) =>{
    const {username,email,contact,password} = req.body
    

    try{
        const userAdd = await userModel.create({

            username: username,
            email: email,
            contact: contact,

            password: password
        })
        res.json(userAdd)
    }catch(err){
        console.log(err)
    }
})

exports.loginUser = asyncHandler(async(req,res)=>{

    const{email,password} = req.body
    console.log(email);
    const user = await userModel.findOne({email: email})
    console.log(user)

    if(!user){
        res.status(404).json({invalid: true,message:'invalid details'})
    }

    const passwordMatch = await bcrypt.compare(password,user.password)

    if(passwordMatch && email){
        const UserFront = {
            id :user._id,
            username :user.username,
            email :user.email,
            contact:user.contact,
            image:user.image,
            name:user.name,
            location:user.location,
            contact:user.contact
        }
        console.log(UserFront)

        res.status(200).json({success: true,message:'logged in successfully',UserFront:UserFront})
    }else{
        res.status(401).json({invalid: true,message:'error occuered to login'})
    }
})

exports.forgotUser = asyncHandler(async (req, res) => {
    const { email } = req.body;  // Corrected to extract email from req.body
  
    try {
      const userForgot = await userModel.findOne({ email: email });
  
      if (!userForgot) {
        return res.status(400).json({ invalid: true, message: "User not found" });
      } else {
        const userDataFront = {
          id: userForgot._id,
          username: userForgot.username,
          email: userForgot.email,
          contact: userForgot.contact,
        };
  
        console.log(userDataFront);
        return res.status(200).json({ userDataFront: userDataFront });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" }); 
    }
  });

  exports.sendingOTP = asyncHandler(async (req, res) => {
    const { email } = req.body;
  
    const userEmail = await userModel.findOne({ email: email });
  
    if (userEmail) {
      console.log(userEmail.email);
  
      const formattedEmail = userEmail.email;
  
      let digits = '0123456789';
      let OTP = '';
      for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
  
      const currentTimestamp = Date.now();
  
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host:'smtp.gmail.com',
        auth: {
          user: emailUsername, 
          pass: emailPassword, 
        },
      });
  
      const info = await transporter.sendMail({
          from: '"M3 auto care" <m3autocare20@gmail.com>',
          to: formattedEmail,
          subject: 'OTP verification',
          html: `<strong>m3 Autocare:</strong>Use <strong>${OTP}</strong> to reset your password.Don't give this code to anyone. <br><strong>m3 Autocare</strong>`,
        });
        
  
   
      const saveOTP = await OTPmodel.create({
        otp: OTP,
        timestamp: currentTimestamp,
      });
      console.log('OTP instance created:', saveOTP, info);
  
      res.json({ message: 'OTP sent successfully' });
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  });

  exports.newPassword =asyncHandler(async(req,res)=>{
    const {id} = req.params
    const { newpassword,password} = req.body

    try{
       

        if(newpassword === password){
            const newPassword= await userModel.findById(id)
            const passwordMatch = await bcrypt.compare(password,newPassword.password)

            newPassword.password = password

            let toUpdate = await newPassword.save()
            res.json(toUpdate)


        }else{
            res.status(404).json({message:'couldn\'t change password may be new password and confirm password are incorrect'})
        }
    }catch(err){
        console.log(err)
    }
  })

  exports.getData = asyncHandler(async(req,res) =>{

    try{
      const getData = await userModel.find()
      res.json(getData)
    }catch(err){
      console.log(err)
    }
  })

  exports.deleteData =asyncHandler(async(req,res)=>{
    const {id} = req.params

    try{
      const deletes =  await userModel.findByIdAndRemove(id)
      res.json(deletes)
    }catch(err){
      console.log(err)
    }
  })

  exports.editData = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const { image, username, name, email, contact, location } = req.body;
  
    try {
      const update = await userModel.findById(id);
  
      
      if (image) update.image = image;
      if (username) update.username = username;
      if (name) update.name = name;
      if (email) update.email = email;
      if (contact) update.contact = contact;
      if (location) update.location = location;
  
      const UserFront = {
        id: update._id,
        username: update.username,
        email: update.email,
        image: update.image,
        location: update.location,
        name: update.name,
        contact: update.contact
        
      };
      console.log(UserFront);
  
      let toUpdate = await update.save();
      res.json({ UserFront: UserFront, toUpdate });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

  exports.getEditData = asyncHandler(async(req,res)=>{
    const {id} = req.params

    try{
      const dataGet  = await userModel.findById(id)
      res.json(dataGet)
      }catch(err){
        console.log(err)
      }
  })
  
  exports.changePassword = asyncHandler(async(req, res)=>{

    const {id} = req.params
    const {oldpassword, newpassword, confirmPassword} = req.body

    try{
      const changePassword = await userModel.findById(id)

      const passwordMatch =await bcrypt.compare(oldpassword, changePassword.password)

      if(!passwordMatch){
        res.status(403).json({message:'Password mismatch'})
      }else if(newpassword === confirmPassword){

        changePassword.password = newpassword;
        const updatedAdmin = await changePassword.save();
        res.status(200).json({message:'Password has been changed',updatedAdmin});

      }else{
        res.status(400).json({message:'You Entered password incorrect'})
      }
    }catch(err){
      console.log(err);
    }
    

  })

  exports.sendEmail = asyncHandler(async (req, res) => {
  const { name, contact, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: emailUsername, 
        pass: emailPassword,
      },
    });

    const info = await transporter.sendMail({
      from: email, 
      to: emailUsername, 
      subject: 'Message',
      html: `<p>Name: ${name}</p><p>Contact: ${contact}</p><p>From: ${email}</p><p>Message: ${message}</p>`,
    });

    console.log(info);
    res.json(info);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Email could not be sent' });
  }
});