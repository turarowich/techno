const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cashbackSchema = new Schema({
    status: {
        type: Boolean,
        required: false,
        default: false
    },
    discounts_status: {
        type: Boolean,
        required: false,
        default: false
    },
    default_cashback: {
        type: Number,
        required: false,
        default: 0,
    },
    min_cashback: {
        type: Number,
        required: false,
        default: 0,
    },
    selectedItemsList : {
        type : Array ,
        default : [],
        required: false,
    },
    welcome_points_status: {
        type: Boolean,
        required: false,
        default: false
    },
    welcome_points_quant: {
        type: Number,
        required: false,
        default: 0,
    },
    share_points_status: {
        type: Boolean,
        required: false,
        default: false
    },
    share_points_quant: {
        type: Number,
        required: false,
        default: 0,
    },
    grant_points_when:{
        type: String,
        required: false,
        default: 'buy',
    },
    birthday_points_status: {
        type: Boolean,
        required: false,
        default: false
    },
    birthday_points_quant: {
        type: Number,
        required: false,
        default: 0,
    },
    bday_message_title:{
        type: String,
        required: false,
        default:'Enter title',
    },
    bday_message_body:{
        type: String,
        required: false,
        default:'Enter message',
    },
    points_lifetime_status: {
        type: Boolean,
        required: false,
        default: false
    },
    points_expiration_period: {
        type: Number,
        required: false,
        default: 0,
    },

})

module.exports = mongoose.model('Cashback', cashbackSchema)