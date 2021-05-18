const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cashback_products_Schema = new Schema({
    cashback :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cashback'
    }
})

module.exports = mongoose.model('CashbackProducts', cashback_products_Schema)