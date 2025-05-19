const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const { 
    deleteReviewById,
    updateReviewById,
    getReviewsByProductId,
    createReviewandRating
} = require("../controllers/review.controller");

// Public routes
router.get("/:productId/reviews", getReviewsByProductId);

// Protected routes (any authenticated user can create/update/delete their own reviews)
router.post("/:productId/reviews", protect, createReviewandRating);
router.put("/reviews/:reviewId", protect, updateReviewById);
router.delete("/reviews/:reviewId", protect, deleteReviewById);

module.exports = router;


/*
! app.use("/api/products", require("./routes/review.routes"));

GET /api/products/:productId/reviews 
TODO : http://localhost:5000/api/products/:productId/reviews

POST /api/products/:productId/reviews
TODO : http://localhost:5000/api/products/:productId/reviews

PUT /api/products/:productId/reviews/:reviewId
TODO : http://localhost:5000/api/products/:productId/reviews/:reviewId

DELETE api/products/:productId/reviews/:reviewId
TODO : http://localhost:5000/api/products/:productId/reviews/:reviewId

*/