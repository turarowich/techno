const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promocodeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name_required'],
        validate: {
            validator: async function (name) {
                const promo = await this.constructor.findOne({ name });
                if (promo) {
                    if (this.id === promo.id) {
                        return true;
                    }
                    return false;
                }
                return true;
            },
            message: props => 'promo_name_unique'
        },
    },
    code: {
        type: String,
        required: [true, 'code_required'],
        validate: {
            validator: async function (code) {
                const promo = await this.constructor.findOne({ code });
                if (promo) {
                    if (this.id === promo.id) {
                        return true;
                    }
                    return false;
                }
                return true;
            },
            message: props => 'promo_code_unique'
        },
    },
    discount: {
        type: Number,
        required: false,
    },
    fixed_sum: {
        type: Number,
        required: false,
    },
    min_sum: {
        type: Number,
        required: false,
    },
    number_of_uses: {
        type: Number,
        required: false,
    },
    already_used: {
        type: Number,
        required: false,
        default: 0,
    },
    selected_type: {
        type: String,
        required: false,
    },
    selected_items_list: {
        type : Array ,
        "default" : [],
        required: false,
    },
    usedBy: [{
        user:{
            type: Schema.Types.ObjectId,
            ref: 'Client',
            required: false,
        },
        quantity:{
            type:Number,
            default:0,
            required: false,
        },
        name:{
            type:String,
            default:'',
            required: false,
        },
        date:{
            type: Date,
            required: true,
            default: Date.now,
        },
    }],
    startDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    endDate: {
        type: Date,
        required: true,
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

module.exports = mongoose.model('Promocode', promocodeSchema)