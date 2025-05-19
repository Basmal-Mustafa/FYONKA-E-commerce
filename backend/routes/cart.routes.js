const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");

const {
    getCart,
    addToCart,
    updateCart,
    deleteFromCart,
} = require("../controllers/cart.controller");

const RoleMiddleWare = require("../middleware/role.middleware");
const Role = require("../constants/role");

router.post("/", protect, addToCart);

router.get("/", protect, getCart);

router.put("/", protect, updateCart);

router.delete("/", protect, deleteFromCart);

module.exports = router;

/*
! app.use("/api/cart", require("./routes/cart.routes"));

POST /
TODO : http://localhost:5000/api/cart

GET /
TODO : http://localhost:5000/api/cart

PUT /
TODO : http://localhost:5000/api/cart

DELETE /
TODO : http://localhost:5000/api/cart

*/