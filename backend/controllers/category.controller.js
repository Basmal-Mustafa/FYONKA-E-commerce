const Category = require("../models/category.model");

const createCategory = async(req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: "Name and description are required" });
    }

    try {
        const newCategory = new Category({
            name,
            description,
        });
        await newCategory.save();
        res.json({ message: "Category Created Successfully", category: newCategory });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: error.message });
    }
};

const getCategories = async(req,res)=>{
    try{
        const categories = await Category.find({});
        res.json({ 
            message: "All Categories retrieved successfully",
            data: categories 
        });
    }catch(error){
        console.error("Error getting categories:", error);
        res.status(500).json({ message: error.message })
    }
};

const updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: "Name and description are required" });
    }
    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name, description }, { new: true });
        res.json({ message: "Category updated successfully", category: updatedCategory });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        await Category.findByIdAndDelete(categoryId);
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
};
