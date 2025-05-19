// routes/categoryRoutes.js

const express = require("express");
const router = express.Router();
const mcache = require('memory-cache');

const {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
} = require("../controllers/category.controller");

// Cache middleware
const cache = (duration) => {
    return (req, res, next) => {
        const key = '__express__' + req.originalUrl || req.url;
        const cachedBody = mcache.get(key);
        
        if (cachedBody) {
            res.send(cachedBody);
            return;
        } else {
            res.sendResponse = res.send;
            res.send = (body) => {
                mcache.put(key, body, duration * 1000);
                res.sendResponse(body);
            };
            next();
        }
    };
};

// All routes are now public (temporarily)
router.post("/", createCategory);
router.put("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategory);
router.get("/", cache(600), getCategories); // Cache for 10 minutes

module.exports = router;


/*
! app.use("/api/categories", require("./routes/category.routes"));

POST /categories
TODO : http://localhost:5000/api/categories

GET /categories
TODO : http://localhost:5000/api/categories

PUT /categories/:categoryId
TODO : http://localhost:5000/api/categories/:categoryId

DELETE /categories/:categoryId 
TODO : http://localhost:5000/api/categories/:categoryId

*/
