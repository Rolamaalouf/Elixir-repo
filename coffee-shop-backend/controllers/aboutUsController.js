const AboutUs = require("../models/AboutUs");

// GET About Us Data
exports.getAboutUs = async (req, res) => {
  try {
    const aboutUs = await AboutUs.findOne();
    if (!aboutUs) return res.status(404).json({ message: "No data found" });
    res.json(aboutUs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// POST - Add New About Us Data (Admin Use)
exports.createAboutUs = async (req, res) => {
  try {
    const newAboutUs = new AboutUs(req.body);
    await newAboutUs.save();
    res.status(201).json(newAboutUs);
  } catch (error) {
    res.status(400).json({ message: "Failed to add data", error });
  }
};

// PUT - Update About Us Data
exports.updateAboutUs = async (req, res) => {
  try {
    const updatedAboutUs = await AboutUs.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAboutUs);
  } catch (error) {
    res.status(400).json({ message: "Update failed", error });
  }
};

// DELETE - Remove About Us Data
exports.deleteAboutUs = async (req, res) => {
  try {
    await AboutUs.findByIdAndDelete(req.params.id);
    res.json({ message: "About Us data deleted" });
  } catch (error) {
    res.status(400).json({ message: "Deletion failed", error });
  }
};
