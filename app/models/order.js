const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    post_id: {
        type: "String",
        default:"",
        required: false,
    },
    code: {
        type: String,
        required: true,
        default: '323232',
    },
    sizes:[{
        size:String,
        quantity:Number,
    }],
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    quantity:{
        type: Number,
        required: true,
        default: 0,
    },
    prepay:{
        type: Number,
        required: false,
        default: 0,
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
    sample: {
        type: Schema.Types.ObjectId,
        ref: 'Sample'
    },
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
    dateStart: {
        type: Date,
        required: false,
        default: Date.now,
    },
    dateEnd: {
        type: Date,
        required: false,
        default: Date.now,
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