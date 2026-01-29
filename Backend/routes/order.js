const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// @route   POST api/order/complete
// @desc    Create a new order
// @access  Public
router.post('/complete', async (req, res) => {
    const { foodName, price, shopId, address, mobile, size, quantity, toppings, totalPrice } = req.body;

    if (!foodName || !price || !address || !mobile || !totalPrice) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        const newOrder = new Order({
            foodName,
            price,
            shopId,
            address,
            mobile,
            size,
            quantity,
            toppings,
            totalPrice
        });

        const savedOrder = await newOrder.save();
        res.json(savedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
