const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promocodeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required'],
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
        required: [true, 'Code required'],
        minlength: [12, 'phone_min'],
    },
    percent: {
        type: Number,
        required: false,
    },
    bonus: {
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
        type: Schema.Types.ObjectId,
        ref: 'Client'
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