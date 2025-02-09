require("dotenv").config(); // Load environment variables  //Loads environment variables from a .env file into process.env.
const express = require("express");
const connectDB = require("./config/db.js"); // Import database connection function //connectDB: A function that connects to MongoDB (defined in config/db.js).
const cors = require("cors"); //: Middleware that enables Cross-Origin Resource Sharing (CORS), allowing frontend applications on different domains to communicate with this backend.
const aboutUsRoutes = require("./routes/aboutUsRoutes"); // Import API routes //aboutUsRoutes: Imports route handlers for the "About Us" API.
/**can be written as:
 *const dotenv = require("dotenv")
 dotenv.config(); // Load environment variables
 */
const app = express(); //Initialize Express App , Creates an Express application instance.

// Connect to MongoDB
connectDB();  //Calls the function that connects to the MongoDB database.

// Middleware
app.use(express.json()); // Allows JSON data parsing(analyze) |Required for handling requests where the client sends JSON in the body (e.g., API POST requests)
app.use(cors()); // Enables Cross-Origin Resource Sharing , allowing front-end app like react to access api,,Without CORS, browsers block requests from different origins due to security policies.

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to the Coffee Shop API ☕️");
});

// Use Routes
app.use("/api/about-us", aboutUsRoutes); // Connect the About Us API  |Any request to http://localhost:5000/api/about-us will be handled by aboutUsRoutes.

// Set PORT
const PORT = process.env.PORT || 5000; //sets the server port: Uses process.env.PORT (from .env file) if available. 
//Defaults to 5000 if PORT is not set.
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)); 



      /*
      Environment variables are loaded (dotenv.config()).
      Express app is created (const app = express();).
      MongoDB connection is established (connectDB();).
      Middleware is applied:
      Parses JSON.
      Enables CORS.
      Routes are set up:
      Test route at /.
      API routes at /api/about-us.
      The server starts listening on port 5000 (or a specified port). */