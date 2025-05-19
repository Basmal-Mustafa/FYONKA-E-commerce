// models/order.model.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        products: [{
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        }],
        status: {
            type: String,
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
            default: "pending"
        },
        shippingAdress: {
            street: { type: String, required: true },
            city: { type: String, required: true },
        },
        phone: {
            type: String,
            required: true,
            match: [/^(\+20)?(010|011|012|015)\d{7}$/, "Please enter a valid Egyptian phone number"],
        },
        totalAmount: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;