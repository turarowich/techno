const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    post_id: {
        type: "String",
        default:"",
        required: false,
    },
    pointsStatus:{
        received:{
            type: Boolean,
            required: false,
            default: false,
        },
        amount:{
            type:Number,
            default:0,
            required: false,
        },
    },
    statusDiscount: {
        name:{
            type: String,
            required: false,
            default: '',
        },
        discount_percentage:{
            type:Number,
            default:0,
            required: false,
        },
    },
    productsDetails: [{
        name: {
            type: String,
            required: false,
            default:'',
        },
        current_price:{
            type:Number,
            default:0,
            required: false,
        },
        old_price:{
            type:Number,
            default:0,
            required: false,
        },
        quantity:{
            type:Number,
            default:0,
            required: false,
        },
        product:{
            type: Schema.Types.Mixed,
            required: false,
        },
        discounted:{
            type: Boolean,
            required: false,
        },
        discountType: {
            type: String,
            required: false,
        },
        size:{
            type: Schema.Types.Mixed,
            required: false,
        },
    }],
    personalDiscount: {
        percent:{
            type: Boolean,
            required: false,
        },
        sum:{
            type:Number,
            default:0,
            required: false,
        },
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'OrderProduct'
    }],
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    code: {
        type: String,
        required: false,
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
    promoCodeObject: {
        type: Schema.Types.Mixed,
        required: false,
    },
    address: {
        type: String,
        required: false,
        default: ''
    },
    status: {
        type: String,
        required: true,
        default: 'waiting'
    },
    delivery: {
        type: Schema.Types.ObjectId,
        ref: 'Delivery'
    },
    deliveryObject: {
        type: Schema.Types.Mixed,
        required: false,
    },
    deliveryPrice: {
        type: Number,
        required: false,
        default: 0
    },
    totalDiscount:{
        type: Number,
        required: false,
        default: 0
    },
    productsPrice: {
        type: Number,
        required: false,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: false,
        default: 0
    },
    branch: {
        type: Schema.Types.ObjectId,
        ref: 'Branch'
    },
    branchObject: {
        type: Schema.Types.Mixed,
        required: false,
    },
    deliveryType: {
        type: String,
        required: true,
        default: 'self'
    },
    points: {
        type: Number,
        required: true,
        default: 0
    },
    earnedPoints: {
        type: Number,
        required: false,
        default: 0
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