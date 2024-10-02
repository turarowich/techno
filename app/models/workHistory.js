const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workHistorySchema = new Schema({
    count: {
        type:String,
        required:false,
        default:''
    },
    worker: {
        type: Schema.Types.ObjectId,
        ref: 'Worker'
    },
    sample: {
        type: Schema.Types.ObjectId,
        ref: 'Sample'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

module.exports = mongoose.model('WorkHistory', workHistorySchema)