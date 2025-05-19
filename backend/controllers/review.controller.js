const Review = require("../models/review.model");
const Product = require("../models/product.model");

const createReviewandRating = async (req, res) => {
    try {
        const { comment, rating } = req.body;
        const { productId } = req.params;
        const userId = req.user._id;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const existingReview = await Review.findOne({ userId, productId });
        if (existingReview) {
            return res.status(400).json({ message: "You have already reviewed this product" });
        }

        const review = await Review.create({
            userId,
            productId,
            comment,
            rating
        });

        product.reviewId.push(review._id);

        const reviews = await Review.find({ productId });
        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
        const averageRating = totalRating / reviews.length;

        product.averageRating = averageRating;
        product.numOfReviews = reviews.length;
        await product.save();

        const reviewWithUser = await Review.findById(review._id)
            .populate("userId", "username email");

        res.status(201).json({
            message: "Review created successfully",
            review: reviewWithUser,
            averageRating
        });
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ 
            message: "Error creating review",
            error: error.message 
        });
    }
};

const getReviewsByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const reviews = await Review.find({ productId })
            .populate("userId", "username email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Reviews retrieved successfully",
            reviews
        });
    } catch (error) {
        console.error("Error getting reviews:", error);
        res.status(500).json({ 
            message: "Error getting reviews",
            error: error.message 
        });
    }
};

const updateReviewById = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { comment, rating } = req.body;
        const userId = req.user._id;

        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        if (review.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Not authorized to update this review" });
        }

        if (rating && (rating < 1 || rating > 5)) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            {
                comment: comment || review.comment,
                rating: rating || review.rating
            },
            { new: true }
        ).populate("userId", "username email");

        const reviews = await Review.find({ productId: review.productId });
        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
        const averageRating = totalRating / reviews.length;

        await Product.findByIdAndUpdate(review.productId, {
            averageRating,
            numOfReviews: reviews.length
        });

        res.status(200).json({
            message: "Review updated successfully",
            review: updatedReview,
            averageRating
        });
    } catch (error) {
        console.error("Error updating review:", error);
        res.status(500).json({ 
            message: "Error updating review",
            error: error.message 
        });
    }
};

const deleteReviewById = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user._id;

        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        if (review.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this review" });
        }

        const deletedReview = await Review.findByIdAndDelete(reviewId);

        await Product.findByIdAndUpdate(review.productId, {
            $pull: { reviewId: reviewId }
        });

        const reviews = await Review.find({ productId: review.productId });
        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
        const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

        await Product.findByIdAndUpdate(review.productId, {
            averageRating,
            numOfReviews: reviews.length
        });

        res.status(200).json({
            message: "Review deleted successfully",
            review: deletedReview,
            averageRating
        });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ 
            message: "Error deleting review",
            error: error.message 
        });
    }
};

module.exports = {
    createReviewandRating,
    getReviewsByProductId,
    updateReviewById,
    deleteReviewById
};


