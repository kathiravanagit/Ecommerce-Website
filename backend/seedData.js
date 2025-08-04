const mongoose = require('mongoose');
const ProductModel = require('./models/productModel');
const products = require('./data/products.json');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.join(__dirname, 'config', 'config.env')});

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to MongoDB');
        
        // Clear existing products
        await ProductModel.deleteMany({});
        console.log('Cleared existing products');
        
        // Insert new products
        await ProductModel.insertMany(products);
        console.log('Products seeded successfully');
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};

seedProducts();
