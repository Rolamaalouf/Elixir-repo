const Menu = require("../models/Menu");

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

// PUT - Update Landing Page Data
exports.updateMenu= async (req, res) => {
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMenu);
  } catch (error) {
    res.status(400).json({ message: "Update failed", error });
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

exports.getItemByCategoryAndId = async (req, res) => {
  try {
    const { category, itemId } = req.params;

    // Find a menu document that contains the requested category (using a case-insensitive regex)
    const menu = await Menu.findOne({
      "menuCategories.categoryName": { $regex: new RegExp(`^${category}$`, "i") }
    });

    if (!menu) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Find the specific category object from the menuCategories array
    const categoryObj = menu.menuCategories.find(
      cat => cat.categoryName.toLowerCase() === category.toLowerCase()
    );

    if (!categoryObj) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Find the item (or subcategory) in the category's items array
    const item = categoryObj.items.find(
      itm => itm._id.toString() === itemId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


exports.getItemsByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Find the menu that contains this category
    const menu = await Menu.findOne({ "menuCategories._id": categoryId });

    if (!menu) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Find the specific category within the menuCategories array
    const category = menu.menuCategories.find(cat => cat._id.toString() === categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category.items); // Return only the items in that category
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
