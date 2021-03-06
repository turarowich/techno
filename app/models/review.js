const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    comment: {
        type: String,
        required: [true, 'Comment required'],
    },
    score: {
        type: Number,
        required: true,
        default: 0,
    },
    type: {
        type: String,
        required: true,
        default: 'Company',
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

module.exports = mongoose.model('Review', reviewSchema)