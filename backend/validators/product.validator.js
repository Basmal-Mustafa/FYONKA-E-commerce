// product.validator.js
const Joi = require("joi");

// Schema for adding a product
const productSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(500).required(),
    category: Joi.string().min(3).max(50).required(),
    color: Joi.string().min(3).max(30).optional(),
    price: Joi.number().positive().required(),
    image: Joi.string().uri().optional(),
    stock: Joi.number().integer().min(0).required(),
});

module.exports = { productSchema };
