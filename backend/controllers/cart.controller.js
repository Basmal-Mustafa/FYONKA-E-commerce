const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");

const addToCart = async (req, res) => {
    const userId = req.user.id;  
    const { productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ message: `Not enough stock for ${product.name}. Available stock: ${product.stock}` });
        }

        let cart = await Cart.findOne({ userId }) || new Cart({ userId, items: [], totalAmount: 0 });

        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity, price: product.price });
        }

        cart.calculateTotalAmount();
        await cart.save();

        const user = await User.findById(userId);
        if (!user.cartItems.includes(cart._id)) {
            user.cartItems.push(cart._id);
            await user.save();
        }

        res.status(200).json({ message: "Product added to cart successfully", cart });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ message: error.message });
    }
};

const getCart = async (req, res) => {
    const userId = req.user.id;
    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        cart.calculateTotalAmount();
        await cart.save();
        const cartDetails = {
            items: cart.items.map(item => {
                const { _id, name, price } = item.productId;  
                const totalPrice = price * item.quantity;  
                return {
                    productId: _id,   
                    name,            
                    quantity: item.quantity, 
                    totalPrice,      
                };
            }),
            totalAmount: cart.totalAmount, 
        };
        res.status(200).json({message: "Successfully get the cart",cart: cartDetails,});
    } catch (error) {
        console.error("Successfully get the cart", error);
        res.status(500).json({ message: error.message });
    }
};

const updateCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    if (quantity < 1) {
        return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.find(item => item.productId.toString() === productId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (quantity > product.stock) {
            return res.status(400).json({ message: `Insufficient stock for product ${product.name}. Available stock: ${product.stock}` });
        }

        item.quantity = quantity;

        cart.calculateTotalAmount();
        await cart.save();

        res.json({ message: "Cart updated successfully", cart });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: error.message });
    }
};

const deleteFromCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
        cart.items.splice(itemIndex, 1);

        await cart.save();

        res.json({ message: 'Product removed from cart successfully', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCart,
    deleteFromCart,
};