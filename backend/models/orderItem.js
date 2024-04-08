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
        min: 0
    }
});

const orderItem = mongoose.model('orderItem', orderItemSchema);

export default orderItem;