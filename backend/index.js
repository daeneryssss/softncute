import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

//const jwt = require("jsonwebtoken");

import Item from './models/item.js';

const app = express();

import 'dotenv/config';

const _port = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const frontend_path = '../frontend/src'

app.use(express.json());
app.use(cors());
//app.use('/upload', express.static('upload/images'));

//app.use(express.static(path.join(__dirname, frontend_path)));

mongoose.connect(process.env.DATABASE_CONNECTION)
.then(() => {
    console.log("Database is connected successfully!");
})
.catch((err) => {
    console.log("Something went wrong with database connection...");
});

/*
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage:storage
});
*/

app.get('/getData', (req, res) => {
    res.send('so this is PEREMOGA');
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

app.listen(_port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${_port}`);
    }
    else {
        console.log(`Error: ${error}`);
    }
});