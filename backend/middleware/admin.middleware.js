const adminMiddleware = (req, res, next) => {
    // هنا بنشيك إذا المستخدم (req.user) موجود ونوعه مش "admin"
    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Permission denied. Admins only." });
    }
  next(); 
};

module.exports = adminMiddleware;

/*
kl middleware fy express bya5d 3 7agat:
req: الطلب اللي جاي من العميل
res: الرد اللي هيطلع
next: دالة بتنقلك للـ middleware أو route اللي بعده

*?. Optional Chaining ==> bttakd alaol en user msh undefined 2bl ma t7aol tosl l role
*/