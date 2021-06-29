const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    title: {
        type: String,
        required: false,
        default: ""
    },
    description: {
        type: String,
        required: false,
        default: ""
    },
    value: {
        type: String,
        required: false,
        default: ""
    },
    valueColor: {
        type: String,
        required: false,
        default: ''
    },
    user: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: false,
        default: ''
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

module.exports = mongoose.model('Log', logSchema)