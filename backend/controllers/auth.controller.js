const User = require("../models/user.model");
const { generateToken } = require("../utils/generateToken");
const { comparePassword } = require("../utils/hashPassword"); 
const {registerSchema,loginSchema} = require("../validators/auth.validator");

const register = async (req, res) => {
    try {
        const { error, value } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const existingUser = await User.findOne({ email: value.email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = await User.create({ ...value});
        const token = generateToken({ id: newUser._id, email: newUser.email, role: newUser.role });
        console.log("Generated Token:", token); // اسراء دا للtest 
        res.status(201).json({
            message: "User Created Successfully",
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const { email, password } = value;
    try {
        console.log(email);
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found, please register" });
        }
        console.log("User found: ", user);
        console.log("Password entered:", password); 
        console.log("Stored hashed password:", user.password); 

        const isMatch = await comparePassword(password, user.password);
        console.log("Password match result:", isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password!" });
        }
        const token = generateToken({ id: user._id, email: user.email, role: user.role }); // ممكن اشيله لو هيدخل علي login تاني
        console.log("Generated Token:", token);
        res.status(200).json({
            message: "Login Successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { login, register };