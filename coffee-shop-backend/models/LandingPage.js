const mongoose = require("mongoose");

const LandingPageSchema = new mongoose.Schema({
  heroSection: {
    siteTitle: { type: String, required: true },
    subtitle: { type: String, required: true },
    image: { type: String, required: true }, // Image URL
  },
  mainSection: {
    tagline: { type: String, required: true },
    ourMenu: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true },
    },
    ourStory: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true },
    },
    visitUs: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true },
    },
  },
});

const LandingPage = mongoose.model("LandingPage", LandingPageSchema);
module.exports = LandingPage;
