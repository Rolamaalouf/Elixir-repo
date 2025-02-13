const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  heroSection: {
    image: { type: String },
    paragraph: { type: String }
  },
  images: [
    {
      type: String
    }
  ],
  bestSellers: [
    {
      image: { type: String },
      description: { type: String }
    }
  ],
  menuCategories: [
    {
      categoryName: { type: String },
      image: { type: String },
      items: [
        {
          name: { type: String, required: true },
          price: { type: Number, required: true }
        }
      ]
    }
  ]
});

module.exports = mongoose.model("Menu", menuSchema);
