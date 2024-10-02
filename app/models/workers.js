const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { randomNumber } = require('../../services/helper')
const workerSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'name_required'],
        minlength: [3, 'name_min'],
    },
    role: {
        type: String,
        required: true,
    },
    uniqueCode: {
        type: String,
        required: false,
        trim: true,
        validate: {
            validator: async function (uniqueCode) {
                const user = await this.constructor.findOne({ uniqueCode });
                if (user) {
                    if (this.id === user.id) {
                        return true;
                    }
                    return false;
                }
                return true;
            },
            message: props => 'code_unique'
        },
        default: randomNumber(100000, 1000000)
    },
    phone: {
        type: String,
        required: [true, 'phone_required'],
        trim: true,
        // unique: true,
        validate: {
            validator: async function (phone) {
                const user = await this.constructor.findOne({ phone: phone });
                if (user) {
                    if (this.id === user.id) {
                        return true;
                    }
                    return false;
                }
                return true;
            },
            message: props => 'phone_unique'
        },
        minlength: [8, 'phone_min'],
        maxlength: [16, 'phone_max']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'email_required'],
        // unique: true,
        validate: {
            validator: async function (email) {
                const user = await this.constructor.findOne({ email }).exec();
                if (user) {
                    if (this.id === user.id) {
                        return true;
                    }
                    return false;
                }
                return true;
            },
            message: props => 'email_unique'
        },
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'email_valid']
    },
    comment: {
        type: String,
        required: false,
        default: ''
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    points: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    avatar: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        required: false,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: false,
        default: Date.now,
    },
})
module.exports = mongoose.model('Worker', workerSchema)