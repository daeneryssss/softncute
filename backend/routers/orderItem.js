const express = require('express');
const router = express.Router();

const { OrderItem } = require('../models/orderItem');
const { Item } = require('../models/item');

router.get('/', async (req, res) => {
    const orderItemList = await OrderItem.find();
    if (!orderItemList) {
        res.status(500).json({success: false});
    }
    res.status(200).send(orderItemList);
});

router.post('/', async (req, res) => {
    try {
        const item = await Category.findOne({id: req.body.item});
        if (!item) {
            return res.status(400).send('Invalid item');
        }
        let orderItem = new OrderItem({
            item: item._id,
            amount: req.body.amount
        });
        orderItem = await orderItem.save();
        
        if (!orderItem) {
            return res.status(404).send('The order item can\t be added.');
        }
        res.send(orderItem);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send('Server error: ' + err.message);
    }
});

router.put('/:id', async(req, res) => {
    const item = await Category.findOne({id: req.body.item});
    if (!item) {
        return res.status(400).send('Invalid item');
    }
    const orderItem = await OrderItem.findByIdAndUpdate(
        req.params.id,
        {
            item: item._id,
            amount: req.body.amount
        },
        {
            new: true
        }
    );

    if (!orderItem) {
        return res.status(404).send('The order item can\'t be updated.');
    };
});

router.delete('/:id', (req, res) => {
    OrderItem.findByIdAndDelete(req.params.id).then(orderItem => {
        if (orderItem) {
            return res.status(200).json({success: true, message: 'The order item has been deleted.'});
        }
        else {
            return res.status(404).json({success: false, error: err});
        }
    });
});

module.exports = router;