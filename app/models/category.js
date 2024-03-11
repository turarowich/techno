const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    oneCId:{
        type: String,
        default:"",
        required: false,
    },
    name: {
        type: String,
        required: [true, 'name_required'],
    },
    type: {
        type: String,
        required: [false, 'type_required'],
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false
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

module.exports = mongoose.model('Category', categorySchema)