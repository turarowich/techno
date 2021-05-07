const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    model_type:{
        type: String,
        default:"Service",
        immutable: true,
    },
    name: {
        type: String,
        required: [true, 'Name required'],
    },
    name_ru: {
        type: String,
        required: false,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    img: {
        type: String,
        required: false,
    },
    imgArray: [{
        type: String,
        required: false,
    }],
    status: {
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
    description: {
        type: String,
        required: false,
    },
    description_ru: {
        type: String,
        required: false,
    },
    vendorCode: {
        type: String,
        required: false,
    },
    quantity: {
        type: Number,
        required: true,
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
    promoStart: {
        type: Date,
        required: false,
    },
    promoEnd: {
        type: Date,
        required: false,
    },
    recommend: {
        type: Boolean,
        required: true,
        default: false
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

module.exports = mongoose.model('Service', serviceSchema)