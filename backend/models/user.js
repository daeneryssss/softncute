import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    middlename: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    phone: {
        type: Number,
        required: true
    },
    country: {
        type: String
    },
    region: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    postcode: {
        type: Number
    }
});

const User = mongoose.model('User', userSchema);

export default User;