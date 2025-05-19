const router = require("express").Router();
const { login, register } = require("../controllers/auth.controller");

// استيراد الـ validate.middleware
// const { validateRegistration, validateLogin } = require("../middleware/validate.middleware");


// استخدام Middleware التحقق على المسارات
router.post("/register",  register); // /auth/register
router.post("/login",  login);             // /auth/login

module.exports = router;

/*
! app.use("/api/auth", require("./routes/auth.routes"));

POST /register 
TODO : http://localhost:5000/api/auth/register

POST /login 
TODO: http://localhost:5000/api/auth/login
*/