const Menu = require("../models/menuModel");

// Get all menu data
exports.getMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get menu data by ID
exports.getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create a new menu page
exports.createMenu = async (req, res) => {
  try {
    const newMenu = new Menu(req.body);
    await newMenu.save();
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update menu page by ID
exports.updateMenu = async (req, res) => {
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedMenu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.json(updatedMenu);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete menu page by ID
exports.deleteMenu = async (req, res) => {
  try {
    const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
    if (!deletedMenu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.json({ message: "Menu deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
