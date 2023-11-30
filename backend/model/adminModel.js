var mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var adminSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  profileInformation: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
    required: true,
  },
  twitter: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: {
    type: String,
    default: "",
  },
});
adminSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;

    next();
  } catch (error) {
    return next(error);
  }
});

const admin = new mongoose.model("adminData", adminSchema);
module.exports = admin;
