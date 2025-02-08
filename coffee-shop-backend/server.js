require('dotenv').config(); // Load environment variables
const express = require('express');
const connectDB = require('./config/db.js'); // Import database connection function

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Allows JSON data parsing

// Simple test route
app.get("/", (req, res) => {
  res.send("Welcome to the Coffee Shop API ☕️");
});

// Set PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
