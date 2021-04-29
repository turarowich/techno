const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderProductSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    name: {
        type: String,
        required: [true, 'Name required'],
    },
    name_ru: {
        type: String,
        required: false,
    },
    img: {
        type: String,
        required: false,
    },
    secondary: {
        type: String,
        required: false,
    },
    secondary_ru: {
        type: String,
        required: false,
    },
    vendorCode: {
        type: String,
        required: false,
    },
    quantity: {
        type: Number,
        required: false,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    promo: {
        type: String,
        required: false,
    },
    promoPrice: {
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

module.exports = mongoose.model('OrderProduct', orderProductSchema)