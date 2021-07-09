const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientBonusHistorySchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    points: {
        type: Number,
        required: false,
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    source: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: false,
        enum: ['received', 'used', 'deducted']
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

module.exports = mongoose.model('clientBonusHistory', clientBonusHistorySchema)