// routes/order.routes.js

const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/auth.middleware");
const {
    createOrder,
    getUserOrders,
    getAllOrders,
    getOrderById,
    updateOrderStatus
} = require("../controllers/order.controller");

// Public routes (protected by authentication)
router.post("/", protect, createOrder);
router.get("/my", protect, getUserOrders);
router.get("/:orderId", protect, getOrderById);

// Admin only routes
router.get("/", protect, admin, getAllOrders);
router.patch("/:orderId/status", protect, admin, updateOrderStatus);

module.exports = router;

/*
! app.use("/api/orders", require("./routes/order.routes"));

POST /api/orders
TODO : http://localhost:5000/api/orders

GET /api/orders/my-orders
TODO : http://localhost:5000/api/orders/my-orders

GET /api/orders/all
TODO : http://localhost:5000/api/orders/all

*/
