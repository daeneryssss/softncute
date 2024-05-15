import mongoose from 'mongoose';

const orderItemSchema = mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    sum: {
        type: Number,
        required: true
    }
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

export default OrderItem;