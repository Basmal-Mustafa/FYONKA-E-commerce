const Product = require("../models/product.model");
const Category = require("../models/category.model");

// Helper function to format image URLs
const formatImageUrls = (product) => {
    if (!product) return null;
    const formattedProduct = product.toObject();
    if (formattedProduct.images) {
        formattedProduct.images = formattedProduct.images.map(image => {
            // If the image is already a full URL, return it as is
            if (image.startsWith('http')) {
                return image;
            }
            // Otherwise, prepend the backend URL for local images
            return `${process.env.BACKEND_URL || 'http://localhost:5000'}/uploads/${image}`;
        });
    }
    return formattedProduct;
};

const adminAddProduct = async (req, res) => {
    try {
        const { name, description, categoryId, color, price, stock } = req.body;
        const userId = req.user.id;

        // Validate category
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        // Validate required fields
        if (!name || !description || !categoryId || !price || !stock) {
            return res.status(400).json({ message: "Missing required product fields" });
        }

        // Validate images
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Please upload product images" });
        }

        const images = req.files.map(file => file.filename);

        const newProduct = new Product({
            images,
            name,
            description,
            price: Number(price),
            categoryId,
            color,
            stock: Number(stock),
            userId
        });

        const product = await newProduct.save();
        const formattedProduct = formatImageUrls(product);

        res.status(201).json({ 
            message: "Product added successfully", 
            product: formattedProduct 
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ 
            message: "Error adding product", 
            error: error.message 
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
            .populate("categoryId")
            .sort({ createdAt: -1 });
        
        const formattedProducts = products.map(formatImageUrls);
        res.status(200).json({ data: formattedProducts });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ 
            message: "Error fetching products", 
            error: error.message 
        });
    }
};

const searchProducts = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const search = {
            $or: [
                { name: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } }
            ]
        };

        const products = await Product.find(search)
            .populate("categoryId")
            .sort({ createdAt: -1 });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found matching your search." });
        }

        const formattedProducts = products.map(formatImageUrls);
        res.json({ 
            message: "Products found successfully", 
            products: formattedProducts 
        });
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ 
            message: "Error searching products", 
            error: error.message 
        });
    }
};

const filterProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, minRating, maxRating } = req.query;

        let filter = {};
        if (category) filter.categoryId = category;
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        if (minRating || maxRating) {
            filter.averageRating = {};
            if (minRating) filter.averageRating.$gte = Number(minRating);
            if (maxRating) filter.averageRating.$lte = Number(maxRating);
        }

        const products = await Product.find(filter)
            .populate("categoryId")
            .sort({ createdAt: -1 });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found matching your filters." });
        }

        const formattedProducts = products.map(formatImageUrls);
        res.json({ 
            message: "Filtered products found successfully", 
            products: formattedProducts 
        });
    } catch (error) {
        console.error('Error filtering products:', error);
        res.status(500).json({ 
            message: "Error filtering products", 
            error: error.message 
        });
    }
};

const adminUpdateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, description, categoryId, color, price, stock, existingImages } = req.body;

        // Validate category if provided
        if (categoryId) {
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(400).json({ message: "Invalid category ID" });
            }
        }

        const updateData = {
            name,
            description,
            price: Number(price),
            categoryId,
            color,
            stock: Number(stock)
        };

        // Get the current product to access existing images
        const currentProduct = await Product.findById(productId);
        if (!currentProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Handle image updates
        let images = [...currentProduct.images]; // Start with existing images

        // If existingImages is provided, use those instead of all current images
        if (existingImages) {
            const existingImagesArray = Array.isArray(existingImages) ? existingImages : [existingImages];
            images = existingImagesArray.map(img => {
                // Extract filename from URL if it's a full URL
                if (img.startsWith('http')) {
                    return img.split('/').pop();
                }
                return img;
            });
        }

        // Add new images if uploaded
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => file.filename);
            images = [...images, ...newImages];
        }

        // Update the images array
        updateData.images = images;

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true }
        ).populate("categoryId");

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const formattedProduct = formatImageUrls(updatedProduct);
        res.json({ 
            message: "Product updated successfully", 
            product: formattedProduct 
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ 
            message: "Error updating product", 
            error: error.message 
        });
    }
};

const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId).populate("categoryId");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const formattedProduct = formatImageUrls(product);
        res.json({ product: formattedProduct });
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ 
            message: "Error fetching product details", 
            error: error.message 
        });
    }
};

const adminRemoveProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findByIdAndDelete(productId);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product removed successfully" });
    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).json({ 
            message: "Error removing product", 
            error: error.message 
        });
    }
};

module.exports = {
    adminAddProduct,
    getAllProducts,
    filterProducts,
    searchProducts,
    getProductDetails,
    adminUpdateProduct,
    adminRemoveProduct
};
/*تمام */