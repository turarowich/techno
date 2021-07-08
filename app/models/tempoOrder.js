const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tempoOrderSchema = new Schema({
    company: {
        type: String,
        required: false,
    },
    company_url: {
        type: String,
        required: false,
    },
    order: [{
        product :  Schema.Types.Mixed,
        quantity : String
    }],
    code: {
        type: String,
        required: false,
    },
    urlcode: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

module.exports = mongoose.model('tempoOrder', tempoOrderSchema)