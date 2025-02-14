const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

// Define routes
router.get("/", menuController.getMenu);
router.get("/:id", menuController.getMenuById);
router.put("/:id", menuController.updateMenu);
router.post("/", menuController.createMenu);

router.delete("/:id", menuController.deleteMenu);

// Retrieves an item (subcategory) within a specific category
router.get("/:category/:itemId", menuController.getItemByCategoryAndId);



module.exports = router;
