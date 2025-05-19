const mongoose = require('mongoose');
const Product = require('../models/product.model');
const Category = require('../models/category.model');
const dbConfig = require('../config/db.config');

const exampleProducts = [
  // Electronics
  {
    name: 'Smart 4K TV',
    description: 'Ultra HD Smart TV with HDR and built-in streaming apps',
    price: 699.99,
    images: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80',
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80',
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80'
    ],
    color: 'Black',
    stock: 50
  },
  {
    name: 'Wireless Headphones',
    description: 'Noise-cancelling Bluetooth headphones with 30-hour battery life',
    price: 199.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80'
    ],
    color: 'White',
    stock: 100
  },

  // Clothing
  {
    name: 'Classic Denim Jacket',
    description: 'Vintage-style denim jacket with modern fit',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=800&q=80',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80'
    ],
    color: 'Blue',
    stock: 75
  },
  {
    name: 'Cotton T-Shirt Pack',
    description: 'Set of 3 premium cotton t-shirts',
    price: 34.99,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80'
    ],
    color: 'White',
    stock: 200
  },

  // Home & Kitchen
  {
    name: 'Stand Mixer',
    description: 'Professional-grade stand mixer for baking enthusiasts',
    price: 299.99,
    images: [
      'https://images.unsplash.com/photo-1558138838-76294be30005?w=800&q=80',
      'https://images.unsplash.com/photo-1522427029273-f8475b7dd6c8?w=800&q=80',
      'https://images.unsplash.com/photo-1556911220-bda9f7f7597e?w=800&q=80'
    ],
    color: 'Red',
    stock: 30
  },
  {
    name: 'Knife Set',
    description: 'Complete set of professional kitchen knives',
    price: 149.99,
    images: [
      'https://images.unsplash.com/photo-1593618998160-c8f9f4789430?w=800&q=80',
      'https://images.unsplash.com/photo-1566454419290-57a0cb800439?w=800&q=80',
      'https://images.unsplash.com/photo-1580013759032-c96505e24c1f?w=800&q=80'
    ],
    color: 'Silver',
    stock: 45
  },

  // Books
  {
    name: 'Best-Selling Novel Collection',
    description: 'Collection of top 5 best-selling novels',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
      'https://images.unsplash.com/photo-1526243741027-444d633d7365?w=800&q=80',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80'
    ],
    color: 'Mixed',
    stock: 60
  },

  // Sports
  {
    name: 'Yoga Mat Set',
    description: 'Premium yoga mat with blocks and strap',
    price: 49.99,
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
      'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&q=80'
    ],
    color: 'Purple',
    stock: 150
  },
  {
    name: 'Fitness Tracker',
    description: 'Smart fitness tracker with heart rate monitoring',
    price: 129.99,
    images: [
      'https://images.unsplash.com/photo-1557935728-e6d1684e0444?w=800&q=80',
      'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=800&q=80',
      'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=800&q=80'
    ],
    color: 'Black',
    stock: 80
  },

  // Beauty
  {
    name: 'Skincare Set',
    description: 'Complete skincare routine kit',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80'
    ],
    color: 'Pink',
    stock: 90
  },

  // Toys
  {
    name: 'Educational Building Blocks',
    description: 'Creative building blocks set for children',
    price: 39.99,
    images: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&q=80',
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80'
    ],
    color: 'Multicolor',
    stock: 120
  },

  // Health
  {
    name: 'Vitamin Bundle',
    description: 'Essential daily vitamins and supplements pack',
    price: 54.99,
    images: [
      'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=800&q=80',
      'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&q=80',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80'
    ],
    color: 'Mixed',
    stock: 200
  }
];

async function seedProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(dbConfig.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Get all categories
    const categories = await Category.find();
    const categoryMap = {};
    categories.forEach(category => {
      categoryMap[category.name] = category._id;
    });

    // Prepare products with category references
    const productsWithCategories = exampleProducts.map(product => {
      let categoryId;
      
      // Match products to categories based on their descriptions and names
      if (product.name.includes('TV') || product.name.includes('Headphones')) {
        categoryId = categoryMap['Electronics'];
      } else if (product.name.includes('Jacket') || product.name.includes('T-Shirt')) {
        categoryId = categoryMap['Clothing'];
      } else if (product.name.includes('Mixer') || product.name.includes('Knife')) {
        categoryId = categoryMap['Home & Kitchen'];
      } else if (product.name.includes('Novel') || product.name.includes('Book')) {
        categoryId = categoryMap['Books'];
      } else if (product.name.includes('Yoga') || product.name.includes('Fitness')) {
        categoryId = categoryMap['Sports'];
      } else if (product.name.includes('Skincare')) {
        categoryId = categoryMap['Beauty'];
      } else if (product.name.includes('Building Blocks')) {
        categoryId = categoryMap['Toys'];
      } else if (product.name.includes('Vitamin')) {
        categoryId = categoryMap['Health'];
      }

      return {
        ...product,
        categoryId
      };
    });

    // Insert products
    const result = await Product.insertMany(productsWithCategories);
    console.log(`Successfully seeded ${result.length} products`);

    // Log the inserted products
    console.log('Inserted products:');
    result.forEach(product => {
      console.log(`- ${product.name} (Category: ${product.categoryId})`);
    });

  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seeding function
seedProducts(); 