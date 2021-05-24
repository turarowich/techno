const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bekaDiscountSchema = new Schema({
    status: {
        type: Boolean,
        required: false,
        default: false
    },
    name: {
        type: String,
        required: true,
        default: '',
    },
    discount_percentage: {
        type: Number,
        required: true,
        default: 0,
    },
    min_sum_of_purchases : {
        type : Number ,
        required: true,
        default: 0,
    },

})

module.exports = mongoose.model('Discount', bekaDiscountSchema)