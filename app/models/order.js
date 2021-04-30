const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'OrderProduct'
    }],
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    client_name: {
        type: String,
        required: false,
    },
    client_phone: {
        type: String,
        required: false,
    },
    notes: {
        type: String,
        required: false,
    },
    promoCode: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
        default: 'waiting'
    },
    deliveryType: {
        type: String,
        required: true,
        default: 'self'
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

module.exports = mongoose.model('Order', orderSchema)