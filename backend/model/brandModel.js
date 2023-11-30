const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const brand = new mongoose.model("brand", brandSchema);

module.exports = brand;
