const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'company_name_required'],
    },
    slogan: {
        type: String,
        required: [true, 'slogan_required'],
    },
    phone: {
        type: String,
        required: false,
        default: ''
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: async function (email) {
                const user = await this.constructor.findOne({ email });
                if (user) {
                    if (this.id === user.id) {
                        return true;
                    }
                    return false;
                }
                return true;
            },
            message: props => 'The specified email address is already in use.'
        }
    },
    country: {
        type: String,
        required: false,
        default: ''
    },
    currency: {
        type: String,
        required: [true, 'currency_required'],
    },
    address: {
        type: String,
        required: false,
        default: ''
    },
    description: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'user'
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

module.exports = mongoose.model('Settings', settingsSchema)