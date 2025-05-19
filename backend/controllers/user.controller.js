const User = require("../models/user.model");

const getAllUsers = async (req, res) => {
    try {
        const { name, email } = req.query;
        const query = {};

        if (name) query.name = { $regex: name, $options: 'i' };
        if (email) query.email = { $regex: email, $options: 'i' };

        const users = await User.find(query)
            .select('-password')
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Users retrieved successfully",
            data: users
        });
    } catch (error) {
        console.error("Error getting users:", error);
        res.status(500).json({
            message: "Error getting users",
            error: error.message
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const requestingUserId = req.user._id;

        // Check if user is requesting their own data or is an admin
        if (id !== requestingUserId.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                message: "Not authorized to access this user's data"
            });
        }

        const user = await User.findById(id)
            .select('-password')
            .populate('orderId')
            .populate('cartItems')
            .populate('productId');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User retrieved successfully",
            data: user
        });
    } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).json({
            message: "Error getting user",
            error: error.message
        });
    }
};

const changeRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!["user", "admin"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User role updated successfully",
            data: user
        });
    } catch (error) {
        console.error("Error updating user role:", error);
        res.status(500).json({
            message: "Error updating user role",
            error: error.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const requestingUserId = req.user._id;

        // Check if user is updating their own data or is an admin
        if (id !== requestingUserId.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                message: "Not authorized to update this user"
            });
        }

        const { password, role, ...updateData } = req.body;

        // Prevent non-admin users from updating certain fields
        if (req.user.role !== 'admin') {
            delete updateData.role;
            delete updateData.isAdmin;
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            message: "Error updating user",
            error: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Prevent users from deleting themselves
        if (id === req.user._id.toString()) {
            return res.status(400).json({
                message: "Cannot delete your own account"
            });
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            message: "Error deleting user",
            error: error.message
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    changeRole,
    updateUser,
    deleteUser
};

