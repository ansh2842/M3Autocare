const asyncHandler = require("express-async-handler");
const adminModel = require("../model/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpModel = require("../model/optModel");
const emailUsername = "m3autocare20@gmail.com";
const emailPassword = "fozbfuwnpjfjfpbr";

exports.datas = asyncHandler(async (req, res) => {
  try {
    const data = await adminModel.create({
      image: "/images/IMG-7964.jpg",
      role: "ceo / founder",
      username: "Nazrin",
      email: "naaz42@gmail.com",
      contact: "8089946865",
      location: "Areekode",
      profileInformation:
        "Hi, I’m Anshad, I’m a full stack web developer and I have much experience in React js , MongoDB , NodeJS and express Js . I am also a freelancer.",
      facebook:
        "https://m.facebook.com/profile.php/?id=100053291650254&name=xhp_nt__fb__action__open_user",
      twitter: "https://twitter.com/k_anshh",
      instagram: "https://www.instagram.com/anshh.ad/",
      password: "naaz42",
    });

    const result = await data.save();
    res.json(result);
    console.log(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const jwtSecretKey = "myjwtsecretkey";
const jwtExpiration = "30d";

exports.adminData = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const Find = await adminModel.findOne({ email: email });

    if (!Find) {
      console.log("user not found");
      return res
        .status(400)
        .json({ invalid: true, message: "invalid details" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, Find.password);
    console.log(passwordMatch);
    if (passwordMatch && email) {
      const payload = {
        userId: Find._id,
        email: Find.email,
      };
      const userprofile = {
        id: Find._id,
        image: Find.image,
        role: Find.role,
        username: Find.username,
        email: Find.email,
        contact: Find.contact,
        location: Find.location,
      };

      const token = jwt.sign(payload, jwtSecretKey, {
        expiresIn: jwtExpiration,
      });
      Find.tokens = token;
      await Find.save();

      console.log("user found");
      res.json({ token, userprofile });
    } else {
      console.log("wrong password");
      return res
        .status(401)
        .json({ invalid: true, message: "invalid details" });
    }
  } catch (err) {
    console.log(err);
  }
});

exports.getAdminData = asyncHandler(async (req, res) => {
  const userprofile = req.user.userId;

  try {
    const admin = await adminModel.findOne({ _id: userprofile });

    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: "Error" });
    }
  } catch (err) {
    console.log(err);
  }
});

exports.changePassword = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const { oldPassword, newPassword } = req.body;

  try {
    const adminChangePassword = await adminModel.findById(userId);

    const passwordMatch = await bcrypt.compare(
      oldPassword,
      adminChangePassword.password
    );
    if (!passwordMatch) {
      return res
        .status(404)
        .json({ invalid: true, message: "Admin not found" });
    }

    if (adminChangePassword.password === oldPassword) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    adminChangePassword.password = newPassword;
    const updatedAdmin = await adminChangePassword.save();
    res.json(updatedAdmin);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred" });
  }
});

exports.getAdminDataForEdit = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const adminData = await adminModel.findById(id);
    res.json(adminData);
  } catch (err) {
    console.log(err);
  }
});

exports.getAdminDataForUpdate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    image,
    role,
    username,
    email,
    contact,
    location,
    profileInformation,
    facebook,
    twitter,
    instagram,
  } = req.body;

  try {
    const letToUpdate = await adminModel.findById(id);
    (letToUpdate.image = image),
      (letToUpdate.role = role),
      (letToUpdate.username = username),
      (letToUpdate.email = email),
      (letToUpdate.contact = contact),
      (letToUpdate.location = location),
      (letToUpdate.profileInformation = profileInformation),
      (letToUpdate.facebook = facebook),
      (letToUpdate.twitter = twitter),
      (letToUpdate.instagram = instagram);

    let toUpdate = await letToUpdate.save();
    res.json(toUpdate);
  } catch (err) {
    console.log(err);
  }
});

exports.updatePasswordWithOtps = asyncHandler(async (req, res) => {
  const emails = req.body.emails;

  // console.log(emails)
  try {
    const adminEmail = await adminModel.findOne({ email: emails });

    if (!adminEmail) {
      return res.status(400).json({ invalid: true, message: "User not found" });
    } else {
      const userData = {
        id: adminEmail._id,
        username: adminEmail.username,
        email: adminEmail.email,
        contact: adminEmail.contact,
      };

      return res.status(200).json({ userData: userData });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

exports.sendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const adminEmail = await adminModel.findOne({ email: email });

  if (adminEmail) {
    console.log(adminEmail.email);

    const formattedEmail = adminEmail.email;

    let digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }

    
    const currentTimestamp = Date.now();

    const saveOTP = await otpModel.create({
      otp: OTP,
      userId:adminEmail._id,
      timestamp: currentTimestamp,
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      auth: {
        user: emailUsername,
        pass: emailPassword,
      },
    });

    const info = await transporter.sendMail({
      from: '"M3 auto care" <m3autocare20@gmail.com>',
      to: formattedEmail,
      subject: "OTP verification",
      html: `<strong>m3 Autocare:</strong>Use <strong>${OTP}</strong> to reset your password.Don't give this code to anyone. <br><strong>m3 Autocare</strong>`,
    });

    
    console.log("OTP instance created:", saveOTP, info);

    res.json({ message: "OTP sent successfully" });
  } else {
    res.status(404).json({ error: "Admin not found" });
  }
});

exports.checkOTP = asyncHandler(async (req, res) => {

  const { password, confirmPassword, email, enterotp } = req.body;

  console.log(req.body);

  try {
    const Userdata = await adminModel.findOne({ email: email });
    console.log('111111111', Userdata);
  
    if (Userdata) {
      const otpData = await otpModel.find({ userId: Userdata._id, otp: enterotp });
      console.log('2222222222', otpData);
  
      if (otpData.length === 0) {
        res.status(404).json({ invalid: true, error: "OTP not found" });
      } else {
        const otp = otpData[0];
  
        const currentTimestamp = Date.now();
        const otpTimestamp = otp.timestamp;
        const timeDifference = currentTimestamp - otpTimestamp;
  
        
        if (password === confirmPassword) {
          
          Userdata.password = confirmPassword;
          let toSave = await Userdata.save();
          res.json(toSave);
          
        } else {
          res.status(400).json({ message: "Passwords do not match" });
        }
        if (timeDifference <= 120000) {
          res.status(400).json({ invalid: true, error: "OTP has expired" });
        } 
      }
    } else {
      res.status(400).json({ message: "Email not found" });
    }
  } catch (err) {
    console.log(err);
  }
  
});


