var mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  image: [
    {
      type: String,
      required: true,
    },
  ],
  Title: {
    type: String,
    required: true,
  },
});

var category = new mongoose.model("Category", categorySchema);

module.exports = category;
