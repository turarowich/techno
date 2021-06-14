const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'OrderProduct'
    }],
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    code: {
        type: String,
        required: false,
    },
    client_name: {
        type: String,
        required: false,
    },
    client_phone: {
        type: String,
        required: false,
    },
    notes: {
        type: String,
        required: false,
    },
    promoCode: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
        default: ''
    },
    status: {
        type: String,
        required: true,
        default: 'waiting'
    },
    delivery: {
        type: Schema.Types.ObjectId,
        ref: 'Delivery'
    },
    deliveryPrice: {
        type: Number,
        required: false,
        default: 0
    },
    totalDiscount:{
        type: Number,
        required: false,
        default: 0
    },
    productsPrice: {
        type: Number,
        required: false,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: false,
        default: 0
    },
    branch: {
        type: Schema.Types.ObjectId,
        ref: 'Branch'
    },
    deliveryType: {
        type: String,
        required: true,
        default: 'self'
    },
    points: {
        type: Number,
        required: true,
        default: 0
    },
    earnedPoints: {
        type: Number,
        required: false,
        default: 0
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

module.exports = mongoose.model('Order', orderSchema)