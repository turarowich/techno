const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderScanSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    // order: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Order'
    // },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

module.exports = mongoose.model('OrderScan', orderScanSchema);