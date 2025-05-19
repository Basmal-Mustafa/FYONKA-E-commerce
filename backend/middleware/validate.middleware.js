// /middleware/validate.middleware.js

const { registerSchema, loginSchema } = require('../validators/auth.validator');
const { productSchema } = require("../validators/product.validator");

exports.validateRegistration = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        console.error("Registration Validation Error:", error.details);
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

exports.validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        console.error("Login Validation Error:", error.details);
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};


// Middleware to validate product data
exports.validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        console.error("Product Validation Error:", error.details);
        return res.status(400).json({message: error.details.map((err) => err.message)});
    }
    next(); 
};
