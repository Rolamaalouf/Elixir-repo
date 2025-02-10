const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log("🔹 Connecting to MongoDB...");
        console.log("🔹 MongoDB URI:", process.env.MONGO_URI); // Debugging line

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};
/**
This line exports the connectDB function so that it can be imported and used in other parts of the application.
In your server.js file, you will import and call this function to establish the connection to MongoDB.
    const connectDB = require("./config/db");
    connectDB();
 */
module.exports = connectDB;


/*
What’s happening inside connectDB:
mongoose.connect():

This is the method used to establish a connection to your MongoDB database.
The first argument process.env.MONGO_URI is the connection string for your MongoDB cluster, which contains credentials, cluster details, and the database name.
process.env.MONGO_URI refers to an environment variable that should be set in your .env file (typically a MongoDB Atlas URI like: mongodb+srv://username:password@cluster.mongodb.net/database).
The second argument is an options object:
useNewUrlParser: true: This ensures that MongoDB URI parser is up-to-date.
useUnifiedTopology: true: This enables the new unified topology engine for MongoDB connections, which improves stability and performance in handling connections.
await:

The await keyword is used to wait for the mongoose.connect() method to complete before moving to the next step.
This ensures that the MongoDB connection is established successfully before proceeding with any application logic.
Error Handling:

try...catch block is used to handle errors.
If the connection to MongoDB fails (due to an invalid URI, network issue, or database unavailability), the catch block will execute.
It logs the error to the console with console.error() and exits the application using process.exit(1).
process.exit(1) forces the application to terminate with an error code (1 indicates failure).
This is crucial in production environments to prevent the app from continuing to run without a working database connection.
Success Logging:

If the connection is successful, console.log("MongoDB Connected Successfully!") will log the success message.
 */