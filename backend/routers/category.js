const express = require('express');
const router = express.Router();

const {Category} = require('../models/category');

router.get('/', async (req, res) => {
    const CategoryList = await Category.find();
    if (!CategoryList) {
        res.status(500).json({success: false});
    }
    res.status(200).send(CategoryList);
});

router.get('/:categoryName', async (req, res) => {
    const categoryFound = await Category.findOne({name: req.params.categoryName});
    if (!categoryFound) {
        res.status(404).json({success: false, message: 'The category has not been found.'});
        return;
    }
    res.status(200).send(categoryFound);
})

router.post('/', async (req, res) => {
    let category = new Category({
        name: req.body.name
    });
    category = await category.save();

    if (!category) {
        return res.status(404).send('The category can\'t be created!');
    }

    res.send(category);
});

router.put('/:id', async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon
        },
        {
            new: true
        }
    );

    if (!category) {
        return res.status(404).send('The category can\'t be updated!');
    }

    res.send(category); 
});

router.delete('/:id', (req, res) => {
    Category.findByIdAndDelete(req.params.id).then(category => {
        if (category) {
            return res.status(200).json({success: true, message: 'The category is deleted.'});
        } else {
            return res.status(404).json({success: false, message: 'The category wasn\'t found'});
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err});
    });
});

module.exports = router;