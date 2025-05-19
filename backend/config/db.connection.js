const mongoose = require("mongoose");

const { MONGODB_URI } = require("./db.config");

const connectDB = async () => {
    try {
        const dbConnection = await mongoose.connect(MONGODB_URI);
        console.log(`MongoDB connected to database: ${dbConnection.connection.name}`);

        mongoose.connection.once("open", () => {
            console.log("MongoDB connection is open");
        });
    } catch (err) {
        console.error("Error connecting to MongoDB: ", err.message);
    }
    mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
    });
    mongoose.connection.on("disconnected", () => {
        console.warn("MongoDB disconnected");
    });
};

module.exports = connectDB;

