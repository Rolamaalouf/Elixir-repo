//Creating Routes for the "About Us" API


//Importing Required Module
const express = require("express");
const router = express.Router();
const AboutUs = require("../models/AboutUs"); // Import the model ,import the Mongoose model for the "About Us" section to interact with MongoDB

// GET request: Fetch About Us data
//This route retrieves the first available "About Us" document from your MongoDB database and sends it as a JSON response.
//When the frontend wants to display the "About Us" page content.
router.get("/", async (req, res) => {  //asynchronous, so it can wait for the database response before continuing.
  try {
        /*Inside the try block, it attempts to find one document from the AboutUs collection.
      .findOne() retrieves one document only, typically the first one in the collection.
        aboutUsData will now hold the retrieved "About Us" information*/
    const aboutUsData = await AboutUs.findOne(); // Get the first document
    res.json(aboutUsData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    //status code 500 (Internal Server Error)
  }
});

// POST request: Add About Us data (Admin Use) add data
router.post("/", async (req, res) => {
  try {
    //req.body: This contains the JSON data sent from the frontend.
    //new AboutUs(req.body): This creates a new document using the Mongoose model (AboutUs).
    const newAboutUs = new AboutUs(req.body); // Create new document
    await newAboutUs.save(); // Save to database | save() stores the new document in MongoDB.
    //If the save is successful, MongoDB automatically assigns an _id to the document.
    //201 is the HTTP status code for "Created".
    res.status(201).json(newAboutUs); //If the database successfully returns the document, it is sent as a JSON response to the frontend.
  } catch (error) {
    res.status(400).json({ message: "Failed to add data", error });
  }

  /*use:
  When the coffee shop owner or admin adds "About Us" content.
  When setting up the page for the first time.
  If the owner wants to reset the content. */
});

// PUT request: Update About Us data modify
router.put("/:id", async (req, res) => {
  try {
    const updatedAboutUs = await AboutUs.findByIdAndUpdate(req.params.id, req.body, { new: true }); //req.params.id This extracts the id from the URL.
    //find & Replaces the old content with the new data from req.body. { new: true } ensures the response contains the updated document.
    res.json(updatedAboutUs); //Sends back the updated document in JSON format.
  } catch (error) {
    res.status(400).json({ message: "Update failed", error });
  }
});

// DELETE request: Remove About Us data
router.delete("/:id", async (req, res) => {
  try {
  const deletedAboutUs = await AboutUs.findByIdAndDelete(req.params.id);//This finds the document using req.params.id and removes it from the database.
    if (!deletedAboutUs) { //this method to fix the success msg if it didnt find the page needed
      return res.status(404).json({ message: "Document not found" });
    }
    res.json({ message: "About Us section deleted successfully" });//Sends a success message confirming deletion.
  }catch (error) {
      res.status(400).json({ message: "Deletion failed", error });
    }
    });

module.exports = router; //export the router so that it can be used in other parts of your application
