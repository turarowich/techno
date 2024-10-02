const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workPrepaySchema = new Schema({
    sum: {
        type:String,
        required:false,
        default:''
    },
    comment: {
        type:String,
        required:false,
        default:''
    },
    worker: {
        type: Schema.Types.ObjectId,
        ref: 'Worker'
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

module.exports = mongoose.model('WorkerPrePay', workPrepaySchema)