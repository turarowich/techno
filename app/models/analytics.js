const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const analyticsSchema = new Schema({
    profit: {
        type: Number,
        required: false,
        default: 0
    },
    income: {
        type: Number,
        required: false,
        default: 0
    },
    discounts: {
        type: Number,
        required: false,
        default: 0
    },
    spentPoints: {
        type: Number,
        required: false,
        default: 0
    },
    averageCheck: {
        type: Number,
        required: false,
        default: 0
    },
    clients: {
        type: Number,
        required: false,
        default: 0
    },
    middleAge: {
        type: Number,
        required: false,
        default: 0
    },
    mans: {
        type: Number,
        required: false,
        default: 0
    },
    women:{
        type: Number,
        required: false,
        default: 0
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

module.exports = mongoose.model('Analytics', analyticsSchema)