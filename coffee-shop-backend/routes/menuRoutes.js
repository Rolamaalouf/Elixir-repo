const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

// Define routes
router.get("/", menuController.getMenu);
router.get("/:id", menuController.getMenuById);
router.get("/section/:sectionId", menuController.getMenuSectionById);
router.post("/", menuController.createMenu);
router.put("/", menuController.updateMenu);
router.delete("/:id", menuController.deleteMenu);
router.patch("/:category/:itemId", menuController.updateItemByCategoryAndId);

// Retrieves an item (subcategory) within a specific category
router.get("/:category/:itemId", menuController.getItemByCategoryAndId);



module.exports = router;
