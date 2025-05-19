// auth.validator.js

const Joi = require("joi");

const registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
    role: Joi.string().valid('admin', 'user').default("user").optional(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
});

module.exports = {registerSchema,loginSchema};
