const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sampleSchema = new Schema({
    post_id: {
        type: "String",
        default:"",
        required: false,
    },
    name: {
        type: String,
        required: [true, 'name_required'],
    },
    img: {
        type: String,
        required: false,
    },
    imgArray: [{
        type: String,
        required: false,
    }],
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
    details: [{
        sewing:{
            type:Number,
            default:0,
            required: false,
        },
        kroy:{
            type:Number,
            default:0,
            required: false,
        },
        quantity:{
            type:Number,
            default:0,
            required: false,
        },
        sewing:{
            type:Number,
            default:0,
            required: false,
        },
        overlok:{
            type:Number,
            default:0,
            required: false,
        },
        rasposhivalka:{
            type:Number,
            default:0,
            required: false,
        },
        vengerka:{
            type:Number,
            default:0,
            required: false,
        },
        petla:{
            type:Number,
            default:0,
            required: false,
        },
        iron:{
            type:Number,
            default:0,
            required: false,
        },
        buttons:{
            type:Number,
            default:0,
            required: false,
        },
        otk:{
            type:Number,
            default:0,
            required: false,
        },
        package:{
            type:Number,
            default:0,
            required: false,
        },
        technolog:{
            type:Number,
            default:0,
            required: false,
        },
        consumption:{
            type:Number,
            default:0,
            required: false,
        },
        furnitura:{
            type:Number,
            default:0,
            required: false,
        },
        otk:{
            type:Number,
            default:0,
            required: false,
        },
        income:{
            type:Number,
            default:0,
            required: false,
        },
        beltclipper:{
            type:Number,
            default:0,
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
        ref: 'Delivery',
        required: false,
        default: null
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

module.exports = mongoose.model('Sample', sampleSchema)