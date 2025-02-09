//Create the Mongoose Model
// Importing Mongoose
const mongoose = require('mongoose');
// Defining the Schema  || new mongoose.Schema({...}): Creates a new schema (or structure) for your MongoDB collection. This schema defines the fields (data structure) for the "About Us" page.
const AboutUsSchema = new mongoose.Schema({
    // Field Breakdown
  ourStory: {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true }, // A string storing the URL of an image.
  },
   //required: true means these fields must be provided when adding data. | An array ([String]) that stores multiple image URLs.
  gallery: {
    title: { type: String, required: true },
    images: [String], // Array of image URLs (carousel)
  },
  mission: {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
  },
  vision: {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
  },
  goPadel: {
    title: { type: String, required: true },
    content: { type: String, required: true },
    buttonText: { type: String, required: true }, //The text that will appear on the button (e.g., "Learn More").
    buttonLink: { type: String, required: true }, //A URL (string) where the button will direct users.
    image: { type: String, required: true },
  },
});

const AboutUs = mongoose.model('AboutUs', AboutUsSchema);  //Creating the Model   |Converts the schema into a Mongoose model, called "AboutUs". model is how we interact with the MongoDB database. It lets us create, read, update, and delete data.

module.exports = AboutUs; // Exporting the Model ||so it can be used in other files, like the routes file (aboutUsRoutes.js).

/* step 2:
We created a schema that defines how the "About Us" page data should be structured.
Each section (Our Story, Gallery, Mission, Vision, Go Padel) is represented as an object inside the schema.
We defined fields like text, images, and buttons.
We exported the model so it can be used in other parts of the backend.
*/