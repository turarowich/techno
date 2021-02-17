const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
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
        type: Schema.Types.ObjectId, 
        ref: 'Category' 
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

module.exports = mongoose.model('Client', clientSchema)