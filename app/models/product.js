const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    //if product has sizes or other props
    hasMultipleTypes: {
        type: Boolean,
        required: false,
        default: false
    },
    //necessary for 1c import
    controlName: {
        type: String,
        required: false,
        unique: true,
        sparse: true,
    },
    sizes:[{
            size:String,
            price:Number,
            oneCId:String,
            vendorCode:String,
            quantity:Number,
        }],
    oneCId:{ //remove
        type: String,
        default:"",
        required: false,
    },
    //either product or service
    type:{
        type: String,
        default:"",
        required: false,
    },
    model_type:{
        type: String,
        default:"Product",
        immutable: true,
    },
    name: {
        type: String,
        required: [true, 'name_required'],
    },
    name_ru: {
        type: String,
        required: false,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required:false
    },
    img: {
        type: String,
        required: false,
    },
    imgArray: [{
        type: String,
        required: false,
    }],
    status: {
        type: String,
        required: false,
    },
    active: {
        type: Boolean,
        required: false,
        default: true
    },
    secondary: {
        type: String,
        required: false,
    },
    secondary_ru: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    description_ru: {
        type: String,
        required: false,
    },
    vendorCode: {
        type: String,
        required: false,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    promo: {
        type: String,
        required: false,
    },
    promoPrice: {
        type: Number,
        required: false,
        default: 0
    },
    promoStart: {
        type: Date,
        required: false,
    },
    promoEnd: {
        type: Date,
        required: false,
    },
    recommend: {
        type: Boolean,
        required: true,
        default: false
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
    colors: [{
        type: Schema.Types.Mixed,
        required: false        
    }],
    productCustomField1: {
        type: String,
        required: false,
    },
    productCustomField2: {
        type: String,
        required: false,
    }
})

module.exports = mongoose.model('Product', productSchema)