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
exports.updateMenu = async (req, res) => {
  try {
    // Extract the _id from the request body and the rest of the update data
    const { _id, ...updateData } = req.body;
    
    if (!_id) {
      return res.status(400).json({ message: "Menu _id is required" });
    }

    // Update the menu document and return the new version
    const updatedMenu = await Menu.findByIdAndUpdate(_id, updateData, { new: true });
    
    if (!updatedMenu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    
    res.json(updatedMenu);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
exports.updateItemByCategoryAndId = async (req, res) => {
  try {
    const { category, itemId } = req.params;
    const updateData = req.body; // Fields to update

    const menu = await Menu.findOne({
      "menuCategories.categoryName": { $regex: new RegExp(`^${category}$`, "i") }
    });

    if (!menu) {
      return res.status(404).json({ message: "Category not found" });
    }

    const categoryObj = menu.menuCategories.find(
      cat => cat.categoryName.toLowerCase() === category.toLowerCase()
    );

    if (!categoryObj) {
      return res.status(404).json({ message: "Category not found" });
    }

    const item = categoryObj.items.find(
      itm => itm._id.toString() === itemId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Loop through updateData
    for (const key in updateData) {
      if (updateData[key] === null || key === "$unset") {
        // Delete the key if the update value is null
        delete item[key];
      } else {
        // Otherwise update the field
        item[key] = updateData[key];
      }
    }

    // Ensure Mongoose detects the change on the nested array
    menu.markModified("menuCategories");

    await menu.save();

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
exports.getMenuSectionById = async (req, res) => {
  try {
    const { sectionId } = req.params;

    // Find the menu document that contains the ID
    const menu = await Menu.findOne({
      $or: [
        { _id: sectionId }, // Check if the section is the whole menu document
        { "heroSection._id": sectionId }, // Check in heroSection
        { "bestSellers._id": sectionId }, // Check in bestSellers
        { "menuCategories._id": sectionId } // Check in menuCategories
      ]
    });

    if (!menu) {
      return res.status(404).json({ message: "Section not found" });
    }

    // Check where the ID is located and return the correct section
    if (menu._id.toString() === sectionId) {
      return res.json(menu);
    }

    if (menu.heroSection && menu.heroSection._id?.toString() === sectionId) {
      return res.json(menu.heroSection);
    }

    const bestSeller = menu.bestSellers.find(bs => bs._id.toString() === sectionId);
    if (bestSeller) {
      return res.json(bestSeller);
    }

    const category = menu.menuCategories.find(cat => cat._id.toString() === sectionId);
    if (category) {
      return res.json(category);
    }

    res.status(404).json({ message: "Section not found" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
