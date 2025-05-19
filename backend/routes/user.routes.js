const express = require('express');
const router = express.Router();
const { protect, admin } = require("../middleware/auth.middleware");
const { getAllUsers, getUserById, changeRole, updateUser, deleteUser } = require('../controllers/user.controller');

const RoleMiddleWare = require("../middleware/role.middleware");
const Role = require("../constants/role");

// Admin only routes
router.get("/", protect, admin, getAllUsers);
router.patch("/:id/role", protect, admin, changeRole);
router.delete("/:id", protect, admin, deleteUser);

// Protected user routes
router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUser);

module.exports = router;

/*
! app.use("/api/users", require("./routes/user.routes")); 

GET /api/users – // Get all users (admin only)
TODO : http://localhost:5000/api/users

GET /api/users/:id – Get single user by ID
TODO : http://localhost:5000/api/users/:id

POST /api/users – Change Role (admin only)
TODO : http://localhost:5000/api/users

PUT /api/users/:id – Update user by ID
TODO : http://localhost:5000/api/users/:id

DELETE /api/users/:id – Delete user by ID (admin only)
TODO : http://localhost:5000/api/users/:id

*/