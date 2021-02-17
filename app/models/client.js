const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    id: { 
        type: String,
        required: true 
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    birthDate: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: false,
        default: ''
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: Number,
        required: false,
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

module.exports = mongoose.model('Clients', clientSchema)