const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        default: ''
    }
});

const OrderSchema = new Schema({
    orderedAt: {
        type: Date,
        default: Date.now
    },
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    orders: {
        type: [OrderItemSchema],
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Orders', OrderSchema);