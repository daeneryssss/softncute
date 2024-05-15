import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    client: {
        type: String,
        required: true
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true
    }],
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
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
        type: String,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;