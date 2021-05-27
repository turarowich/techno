const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name_required'],
    },
    welcome: {
        type: String,
        required: true,
    },
    slogan: {
        type: String,
        required: [true, 'slogan_required'],
    },
    email: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: false,
    },
    backgroundImageApp: {
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
    chat: {
        type: Boolean,
        required: true,
        default: true
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
    catalogUrl: {
        type: String,
        required: false,
        default: "",
    },
    filters_n_cat_status: {
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
    instagram: {
        type: String,
        required: false,
        default: ""
    },
    facebook: {
        type: String,
        required: false,
        default: ""
    },
    website: {
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