const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catalogs = new Schema({
    company: {
        type: String,
        default: ""
    },
    cat_url: {
        type: String,
        default: ""
    },
})

module.exports = mongoose.model('catalogs', catalogs)