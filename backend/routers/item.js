const express = require('express');
const router = express.Router();

const { Item } = require('../models/item');
const { Category } = require('../models/category');

router.get('/', async (req, res) => {
    const itemList = await Item.find();
    if (!itemList) {
        res.status(500).json({success: false});
    }
    res.status(200).send(itemList);
});

router.post('/', async (req, res) => {
    try {
        const category = await Category.findOne({name: req.body.category});
        if (!category) {
            return res.status(400).send('Invalid category');
        }
        let item = new Item({
            name: req.body.name,
            category: category._id,
            price: req.body.price,
            amountAvailable: req.body.amountAvailable,
            image: req.body.image,
            isPlushie: req.body.isPlushie
        });
        item = await item.save();

        if (!item) {
            return res.status(404).send('The item can\'t be created.');
        }
        res.send(item);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error: ' + err.message);
    };
});

router.put('/:id', async(req, res) => {
    const category = await Category.findOne({name: req.body.category});
    if (!category) {
        return res.status(400).send('Invalid category');
    }
    const item = await Item.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            category: category._id,
            price: req.body.price,
            amountAvailable: req.body.amountAvailable,
            image: req.body.image
        },
        {
            new: true
        }
    );

    if (!item) {
        return res.status(404).send('The item can\'t be updated!');
    };
});

router.delete('/:id', (req, res) => {
    Item.findByIdAndDelete(req.params.id).then(item => {
        if (item) {
            return res.status(200).json({success: true, message: 'The item has been deleted.'});
        }
        else {
            return res.status(404).json({success: false, error: err})
        };
    });
});

module.exports = router;