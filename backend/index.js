import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import Item from './models/item.js';
import OrderItem from './models/orderItem.js';

const app = express();

import 'dotenv/config';
import Order from './models/order.js';

const _port = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const frontend_path = '../frontend/src'

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_CONNECTION)
.then(() => {
    console.log("Database is connected successfully!");
})
.catch((err) => {
    console.log("Something went wrong with database connection...");
});

app.get('/assortment', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    };
});

app.get('/cart/items', async (req, res) => {
    try {
        const orderItems = await OrderItem.find();
        res.json(orderItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    };
});

app.post('/cart/addItem', async (req, res) => {
    try {
        const { item, amount, sum } = req.body;
        const newOrderItem = new OrderItem({
            item,
            amount,
            sum
        });
        await newOrderItem.save();
        res.status(201).json({ message: 'Order item added successfully', newOrderItem});
        console.log(newOrderItem);
    } catch (error) {
        console.error('Error adding order item:', error);
        res.status(500).json({ error: 'Internal server error'});
    };
});

app.delete('/cart/deleteItem/:id', async (req, res) => {
    try {
        const orderItemId = req.params.id;
        const deletedItem = await OrderItem.findByIdAndDelete(orderItemId);
        if (deletedItem) {
            res.status(200).json({message: 'Order item deleted successfully', deletedItem});
        } else {
            res.status(404).json({error: 'Order item not found'});
        }
    } catch (error) {
        console.error('Error deleting order item:', error);
        res.status(500).json({error: 'Internal server error'});
    };
});

app.post('/sendOrder', async (req, res) => {
    try {
        const { client, orderItems, phone, email, country, region, city, address, postcode } = req.body;
        const orderItemIds = orderItems.map(itemId => mongoose.Types.ObjectId(itemId));
        const newOrder = new Order({
            client, orderItems: orderItemIds, phone, email, country, region, city, address, postcode
        });
        await newOrder.save();
        res.status(201).json({ message: 'Order send successfully', newOrder});
        console.log(newOrder);
    } catch (error) {
        console.error('Error adding order:', error);
        res.status(500).json({ error: 'Internal server error'});
    };
})

app.listen(_port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${_port}`);
    }
    else {
        console.log(`Error: ${error}`);
    }
});