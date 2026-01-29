const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shopId: {
        type: String,
        required: false
    },
    size: {
        type: String,
        enum: ['Small', 'Medium', 'Large'],
        default: 'Medium'
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    toppings: [{
        type: String
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
