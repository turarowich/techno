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
    backgroundImageApp: {
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
    deliveryDescription: {
        type: String,
        required: false,
        default: ""
    },
    ////Catalog settings
    catalogStatus: {
        type: Boolean,
        required: false,
    },
    catalogUrl: {
        type: String,
        required: false,
        default: "",
    },
    catalogMode: {
        type: Boolean,
        required: true,
        default: false
    },
    newsStatus: {
        type: Boolean,
        required: false,
        default: false
    },
    newsTitle: {
        type: String,
        required: false,
        default:'',
    },
    newsDescription: {
        type: String,
        required: false,
        default:'',
    },
    filtersCategoryStatus: {
        type: Boolean,
        required: true,
        default: false
    },
    foodMode: {
        type: Boolean,
        required: true,
        default: false
    },
    logo: {
        type: String,
        required: false,
    },
    banner: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    color: {
        type: String,
        required: false,
    },
    whatsapp: {
        type: String,
        required: false,
        default: ""
    },
    telegram: {
        type: String,
        required: false,
        default: ""
    },
    facebook: {
        type: String,
        required: false,
        default: ""
    },
    instagram: {
        type: String,
        required: false,
        default: ""
    },
    website: {
        type: String,
        required: false,
        default: ""
    },
    //////catalog end
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