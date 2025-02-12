const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  heroSection: {
    image: String,
    paragraph: String,
  },
  images: [String], // Stores the two images on the page
  bestSellers: [
    {
      image: String,
      description: String,
    },
  ],
  menuCategories: [
    {
      categoryName: String,
      items: [
        {
          name: String,
          description: String,
          price: Number,
          image: String,
        },
      ],
    },
  ],
});

const Menu = mongoose.model("Menu", MenuSchema);
module.exports = Menu;

