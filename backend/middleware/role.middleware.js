const RoleMiddleWare = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
        return res.status(403).json({
            message: "You are not authorized to delete this user",
        });
        }
        next();
    };
};

module.exports = RoleMiddleWare;