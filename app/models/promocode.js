const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promocodeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    percent: {
        type: Number,
        required: false,
    },
    bonus: {
        type: Number,
        required: false,
    },
    usedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }],
    startDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    endDate: {
        type: Date,
        required: true,
        default: Date.now,
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

module.exports = mongoose.model('Promocode', promocodeSchema)