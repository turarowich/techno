const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    ignoreImagesOnImport: {
        type: Boolean,
        required: false,
        default: true
    },
    ignoreChangesOnImport: {
        type: Boolean,
        required: false,
        default: true
    },
    removeGhostsOnImport: {
        type: Boolean,
        required: false,
        default: false
    },
    groupItemsOnImport: {
        type: Boolean,
        required: false,
        default: true
    },

    name: {
        type: String,
        required: [true, 'name_required'],
        default:'CompanyName',
    },
    welcome: {
        type: String,
        required: true,
        default:'WelcomeText',
    },
    slogan: {
        type: String,
        required: [true, 'slogan_required'],
        default:'SloganText',
    },
    email: {
        type: String,
        required: true,
        default:'example@org.com',
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
        required: false,
        default:'KGS',
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
    APNsTopic: {
        type: String,
        required: false,
        default: ""
    },
    customFields: {
        type: Boolean,
        required: true,
        default: false
    },
    custom_field_0: {
        required: {
            type: Boolean,
            required: false,
            default: false
        },
        fieldName:{
            type: String,
            required: false,
            default: ""
        },
        values: [{
            type: String,
            required: false,
            default: ""
        }]
    },
    custom_field_1: {
        required: {
            type: Boolean,
            required: false,
            default: false
        },
        fieldName: {
            type: String,
            required: false,
            default: ""
        },
        values: [{
            type: String,
            required: false,
            default: ""
        }]
    },
    custom_field_2: {
        required: {
            type: Boolean,
            required: false,
            default: false
        },
        fieldName: {
            type: String,
            required: false,
            default: ""
        },
        values: [{
            type: String,
            required: false,
            default: ""
        }]
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