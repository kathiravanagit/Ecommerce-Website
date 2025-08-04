const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');

//Create Order - /api/v1/order 
exports.createOrder = async (req, res, next) => {
    try {
        const { cartItems, shippingAddress } = req.body;
        
        // Validate required fields
        if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Cart items are required'
            });
        }
        
        if (!shippingAddress) {
            return res.status(400).json({
                success: false,
                message: 'Shipping address is required'
            });
        }
        
        const amount = Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)).toFixed(2);
        const status = 'pending';
        
        const order = await orderModel.create({
            cartItems, 
            amount, 
            status, 
            shippingAddress,
            createdAt: new Date()
        });

        // Updating product stock
        cartItems.forEach(async (item)=> {
            const product = await productModel.findById(item.product._id);
            if (product) {
                product.stock = product.stock - item.qty;
                await product.save();
            }
        });

        res.json({
            success: true,
            order
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create order'
        });
    }
}