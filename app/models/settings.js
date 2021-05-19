const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    slogan: {
        type: String,
        required: [true, 'slogan_required'],
    },
    logo: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
        default: ''
    },
    currency: {
        type: String,
        required: false
    },
    delivery: {
        type: Boolean,
        required: true,
        default: false
    },
    catalogMode: {
        type: Boolean,
        required: true,
        default: false
    },
    foodMode: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveryDescription: {
        type: String,
        required: false,
        default: ""
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

module.exports = mongoose.model('Settings', settingsSchema)