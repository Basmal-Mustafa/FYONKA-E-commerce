const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const reviewSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        comment: { type: String, required: true },
        rating: { type: Number, min: 1, max: 5, required: true },
    },
    { timestamps: true },
)
reviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;