const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    text: {
        type: String,
        required: true,
    },
    isIncoming: {
        type: Boolean,
        required: true,
        default: false
    },
    news: {
        type: Boolean,
        required: true,
        default: true
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

module.exports = mongoose.model('Message', messageSchema)