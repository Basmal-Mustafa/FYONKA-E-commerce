const Order = require("../models/order.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const Cart = require("../models/cart.model");

const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { shippingAdress, phone } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        if (!shippingAdress || !shippingAdress.street || !shippingAdress.city) {
            return res.status(400).json({ message: "Shipping address is required (street and city)" });
        }

        if (!phone) {
            return res.status(400).json({ message: "Phone number is required" });
        }

        const productChecks = cart.items.map(async (item) => {
            const product = await Product.findById(item.productId);
            if (!product) {
                throw new Error(`Product with ID ${item.productId} not found`);
            }
            if (item.quantity > product.stock) {
                throw new Error(`Product ${product.name} is out of stock`);
            }
        });

        await Promise.all(productChecks);

        cart.calculateTotalAmount();
        await cart.save();

        const order = new Order({
            userId,
            products: cart.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            })),
            shippingAdress,
            phone,
            totalAmount: cart.totalAmount
        });

        await order.save();

        await Promise.all(
            cart.items.map(item =>
                Product.findByIdAndUpdate(item.productId, {
                    $inc: { stock: -item.quantity }
                })
            )
        );

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.orderId.push(order._id);
        await user.save();

        await Cart.findOneAndDelete({ userId });

        // Order Summary
        const orderSummary = order.products.map(item => ({
            productName: item.productId.name,
            quantity: item.quantity,
            totalPrice: item.price * item.quantity
        }));

        res.status(200).json({
            message: "Order placed successfully",
            order: {
                id: order._id,
                products: orderSummary,
                shippingAdress,
                totalAmount: order.totalAmount,
            }
        });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: error.message });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;  
        const orders = await Order.find({ userId })
            .populate("userId", "name email")
            .populate("products.productId", "name price");

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        const orderHistory = orders.map(order => ({
            orderId: order._id,
            status: order.status,
            totalAmount: order.totalAmount,
            shippingAdress: order.shippingAdress,
            products: order.products.map(item => ({
                productName: item.productId.name,
                quantity: item.quantity,
                totalPrice: item.price * item.quantity,
            })),
            createdAt: order.createdAt,
        }));

        res.status(200).json({
            message: "Orders retrieved successfully",
            orderHistory,
        });
    } catch (error) {
        console.error("Error getting user orders:", error);
        res.status(500).json({ message: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("userId", "username email")
            .populate("products.productId", "name price"); 

        res.status(200).json({ message: "Get All Orders Successfully", data: orders });
    } catch (error) {
        console.error("Error getting all orders:", error);
        res.status(500).json({ message: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user._id;

        const order = await Order.findById(orderId)
            .populate("userId", "name email")
            .populate("products.productId", "name price");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Check if user is authorized to view this order
        if (order.userId._id.toString() !== userId.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Not authorized to view this order" });
        }

        const orderDetails = {
            orderId: order._id,
            status: order.status,
            totalAmount: order.totalAmount,
            shippingAdress: order.shippingAdress,
            phone: order.phone,
            products: order.products.map(item => ({
                productName: item.productId.name,
                quantity: item.quantity,
                totalPrice: item.price * item.quantity,
            })),
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        };

        res.status(200).json({
            message: "Order retrieved successfully",
            data: orderDetails
        });
    } catch (error) {
        console.error("Error getting order:", error);
        res.status(500).json({ message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!["pending", "processing", "shipped", "delivered", "cancelled"].includes(status)) {
            return res.status(400).json({ message: "Invalid order status" });
        }

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        ).populate("userId", "name email")
         .populate("products.productId", "name price");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({
            message: "Order status updated successfully",
            data: order
        });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getUserOrders,
    getAllOrders,
    getOrderById,
    updateOrderStatus
};

