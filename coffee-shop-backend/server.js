const express = require('express');
require('dotenv').config(); // Load environment variables
const connectDB = require('./config/db.js'); // Import database connection function

const landingPageRoutes = require("./routes/landingPageRoutes");

const app = express();

// Check if MONGO_URI is being read properly
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not defined. Check your .env file!");
  process.exit(1); // Stop the server if no database URL
}

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Allows JSON data parsing

// Simple test route
app.get("/", (req, res) => {
  res.send("Welcome to the Coffee Shop API ☕️");
});
//use Routes
app.use("/api/landing-page", landingPageRoutes); //connect the landing page to the API 

// Set PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
