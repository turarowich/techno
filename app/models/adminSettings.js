const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSettings = new Schema({
    autoBlock: {
        type: Boolean,
        required: false,
        default: false
    },
})

module.exports = mongoose.model('AdminSettings', adminSettings)