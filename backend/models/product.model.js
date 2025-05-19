const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    images:  { type: [String], required: true },
    name:   { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, 
    color: { type: String, required: true },
    stock: { type: Number, default: 0 },
    
    userId:  { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    
    averageRating: { type: Number, default: 0 },
    numOfReviews: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

