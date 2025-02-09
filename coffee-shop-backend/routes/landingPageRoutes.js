const express = require("express");
const router = express.Router();
const landingPageController = require("../controllers/landingPageController");

// Define routes
router.get("/", landingPageController.getLandingPage);
router.get("/:id", landingPageController.getLandingPage);
router.post("/", landingPageController.createLandingPage);
router.put("/:id", landingPageController.updateLandingPage);
router.delete("/:id", landingPageController.deleteLandingPage);

module.exports = router;
