const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const newsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    name_ru: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    desc_ru: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: false,
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

module.exports = mongoose.model('News', newsSchema)