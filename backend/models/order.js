import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true
    }],
    country: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    postcode: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;