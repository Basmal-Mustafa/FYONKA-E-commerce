const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, required: true, min: 1 },
                price: { type: Number, required: true }
            }
        ],
        totalAmount: { type: Number, required: true, default: 0 }, 
    },
    { timestamps: true }
);

cartSchema.methods.calculateTotalAmount = function() {
    this.totalAmount = this.items.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );
};

cartSchema.pre('save', function(next) {
    this.calculateTotalAmount(); 
    next();
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
