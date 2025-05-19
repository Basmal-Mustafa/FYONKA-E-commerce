const mongoose = require('mongoose');
const Category = require('../models/category.model');
const dbConfig = require('../config/db.config');

const exampleCategories = [
  { name: 'Electronics', description: 'Electronic devices and accessories' },
  { name: 'Clothing', description: 'Fashion and apparel items' },
  { name: 'Home & Kitchen', description: 'Home decor and kitchen essentials' },
  { name: 'Books', description: 'Books and educational materials' },
  { name: 'Sports', description: 'Sports equipment and accessories' },
  { name: 'Beauty', description: 'Beauty and personal care products' },
  { name: 'Toys', description: 'Toys and games for all ages' },
  { name: 'Health', description: 'Health and wellness products' }
];

async function seedCategories() {
  try {
    // Connect to MongoDB
    await mongoose.connect(dbConfig.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing categories
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    // Insert new categories
    const result = await Category.insertMany(exampleCategories);
    console.log(`Successfully seeded ${result.length} categories`);

    // Log the inserted categories
    console.log('Inserted categories:');
    result.forEach(category => {
      console.log(`- ${category.name}: ${category.description}`);
    });

  } catch (error) {
    console.error('Error seeding categories:', error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seeding function
seedCategories(); 