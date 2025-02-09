const LandingPage = require("../models/LandingPage");

// GET Landing Page Data
exports.getLandingPage = async (req, res) => {
  try {
    const landingPage = await LandingPage.findOne();
    if (!landingPage) return res.status(404).json({ message: "No data found" });
    res.json(landingPage);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// POST - Add New Landing Page Data (Admin Use)
exports.createLandingPage = async (req, res) => {
  try {
    const newLandingPage = new LandingPage(req.body);
    await newLandingPage.save();
    res.status(201).json(newLandingPage);
  } catch (error) {
    res.status(400).json({ message: "Failed to add data", error });
  }
};

// PUT - Update Landing Page Data
exports.updateLandingPage = async (req, res) => {
  try {
    const updatedLandingPage = await LandingPage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedLandingPage);
  } catch (error) {
    res.status(400).json({ message: "Update failed", error });
  }
};

// DELETE - Remove Landing Page Data
exports.deleteLandingPage = async (req, res) => {
  try {
    await LandingPage.findByIdAndDelete(req.params.id);
    res.json({ message: "Landing Page data deleted" });
  } catch (error) {
    res.status(400).json({ message: "Deletion failed", error });
  }
};
