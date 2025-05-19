const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config");
const { protect, admin } = require("../middleware/auth.middleware");
const {
    adminAddProduct,
    getAllProducts,
    filterProducts,
    searchProducts,
    getProductDetails,
    adminUpdateProduct,
    adminRemoveProduct,
} = require("../controllers/product.controller");

// Public routes
router.get("/", getAllProducts);
router.get("/search", searchProducts);
router.get("/filter", filterProducts);
router.get("/:productId", getProductDetails);

// Admin routes (protected)
router.post("/", protect, admin, upload.array('images', 5), adminAddProduct);
router.put("/:productId", protect, admin, upload.array('images', 5), adminUpdateProduct);
router.delete("/:productId", protect, admin, adminRemoveProduct);

module.exports = router;

/*
! app.use("/api/products", require("./routes/product.routes"));

POST /api/products/
TODO : http://localhost:5000/api/products

GET /api/products/
TODO : http://localhost:5000/api/products

GET /api/products/:productId
TODO : http://localhost:5000/api/products/:productId

GET /api/filter?minPrice=...&maxPrice=...&category=...
TODO : http://localhost:5000/api/products/filter?minPrice=100&maxPrice=500

GET /api/products/search?keyword=...
TODO : http://localhost:5000/api/products/search?keyword=laptop

PUT /api/products/:productId
TODO : http://localhost:5000/api/products/:productId

DELETE /api/products/:productId
TODO : http://localhost:5000/api/products/:productId

*/