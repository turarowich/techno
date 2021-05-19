const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const branchSchema = new Schema({
    address: {
        type: String,
        required: [true, "name_required"],
        default: ""
    },
    longitude: {
        type: Number,
        required: true,
        default: 0
    },
    latitude: {
        type: Number,
        required: true,
        default: 0
    },
    phone: {
        type: String,
        required: [true, "phone_required"],
        default: ""
    },
    phone2: {
        type: String,
        required: true,
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

module.exports = mongoose.model('Branch', branchSchema)