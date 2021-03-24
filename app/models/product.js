const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required'],
    },
    img: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    article: {
        type: String,
        required: false,
    },
    promo: {
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
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
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

module.exports = mongoose.model('Product', productSchema)