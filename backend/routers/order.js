const express = require('express');
const router = express.Router();

const { Order } = require('../models/order');
const { User } = require('../models/user');
const { OrderItem } = require('../models/orderItem');

router.get('/', async (req, res) => {
    const orderList = await Order.find();
    if (!orderList) {
        res.status(500).json({success: false});
    }
    res.status(200).send(orderList);
});

router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({id: req.body.id});
        if (!user) {
            return res.status(400).send('Invalid user');
        }
        const orderItem = await OrderItem.findOne({id: req.body.id});
        if (!orderItem) {
            return res.status(400).send('Invalid order item');
        }
        let order = new Order({
            client: user._id,
            order: orderItem._id,
            country: req.body.country,
            region: req.body.region,
            city: req.body.city,
            address: req.body.address,
            postcode: req.body.postcode,
            phone: req.body.phone
        });
        order = await order.save();

        if (!order) {
            return res.status(404).send('The order can\'t be created.');
        }
        res.send(order);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error: ' + error.message);
    }
});

router.put('/:id', async(req, res) => {
    try {
        const user = await User.findOne({id: req.body.id});
        if (!user) {
            return res.status(400).send('Invalid user');
        }
        const orderItem = await OrderItem.findOne({id: req.body.id});
        if (!orderItem) {
            return res.status(400).send('Invalid order item');
        }
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                client: user._id,
                order: orderItem._id,
                country: req.body.country,
                region: req.body.region,
                city: req.body.city,
                address: req.body.address,
                postcode: req.body.postcode,
                phone: req.body.phone
            },
            {
                new: true
            }
        );
        order = await order.save();

        if (!order) {
            return res.status(404).send('The order can\'t be created.');
        }
        res.send(order);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error: ' + error.message);
    }
})

module.exports = router;