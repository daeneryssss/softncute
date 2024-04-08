const express = require('express');
const router = express.Router();

const { User } = require('../models/user');

router.get('/', async (req, res) => {
    const userList = await User.find();
    if (!userList) {
        res.status(500).json({success: false});
    }
    res.status(200).send(userList);
});

router.post('/', async (req, res) => {
    let user = new User({
        email: req.body.email,
        password: req.body.password,
        surname: req.body.surname,
        name: req.body.surname,
        middlename: req.body.middlename,
        isAdmin: false,
        phone: req.body.phone,
        country: req.body.country,
        region: req.body.region,
        city: req.body.city,
        address: req.body.address,
        postcode: req.body.postcode
    });
    user = await user.save();

    if (!user) {
        return res.status(404).send('There is some problem with registration...');
    }

    res.send(user);
});

router.put(':/id', async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            email: req.body.email,
            password: req.body.password,
            surname: req.body.surname,
            name: req.body.surname,
            middlename: req.body.middlename,
            isAdmin: false,
            phone: req.body.phone,
            country: req.body.country,
            region: req.body.region,
            city: req.body.city,
            address: req.body.address,
            postcode: req.body.postcode
        },
        {
            new: true
        }
    );

    if (!user) {
        return res.status(404).send('The info can\'t be updated.');
    }

    res.send(user);
});

router.delete(':/id', (req, res) => {
    User.findByIdAndDelete(req.params.id).then(user => {
        if (user) {
            return res.status(200).json({success: true, message: 'The user has been deleted!'});
        }
        else {
            return res.status(404).json({success: false, message: 'The user hasn\'t been found'});
        }
    }).catch(err => {
        return res.status(400).jsonn({success: false, error: err});
    });
});

module.exports = router;