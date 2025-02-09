require("dotenv").config(); // Load environment variables
const express = require("express");
const connectDB = require("./config/db.js"); // Import database connection function
const cors = require("cors");
const aboutUsRoutes = require("./routes/aboutUsRoutes"); // Import API routes
/**can be written as:
 *const dotenv = require("dotenv")
 dotenv.config(); // Load environment variables
 */
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Allows JSON data parsing
app.use(cors()); // Enables Cross-Origin Resource Sharing

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to the Coffee Shop API ☕️");
});

// Use Routes
app.use("/api/about-us", aboutUsRoutes); // Connect the About Us API

// Set PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
