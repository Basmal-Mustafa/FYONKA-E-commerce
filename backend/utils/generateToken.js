// utils/generateToken.js
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = "maxsteel221_secret_key_2024";

function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "30m" });
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET_KEY);
}

module.exports = { generateToken, verifyToken };
