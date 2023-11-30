var mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: [
    {
      type: String,
      required: true,
    },
  ],
  name: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const product = new mongoose.model("product", productSchema);

module.exports = product;
