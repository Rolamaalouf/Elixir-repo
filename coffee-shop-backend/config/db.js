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

module.exports = connectDB;
