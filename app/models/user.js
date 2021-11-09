const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    oneCApiAddress: {
        type: String,
        required: false,
        default:'',
    },
    oneCApiLogin: {
        type: String,
        required: false,
        default:'',
    },
    oneCApiPassword: {
        type: String,
        required: false,
        default:'',
    },
    name: {
        type: String,
        required: [true, 'name_required'],
    },
    phone: {
        type: String,
        required: [true, 'phone_required'],
        validate: {
            validator: async function (phone) {
                const user = await this.constructor.findOne({ phone });
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
        required: [true, 'email_required'],
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
            message: props => 'email_unique'
        },
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'email_valid']
    },
    password: {
        type: String,
        required: [true, 'password_required'],
        select: false,
        minlength: [8, 'password_min'],
        maxlength: [64, 'password_max'],
        match: [/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'password_valid']
    },
    _db: {
        type: String,
        required: false,
        select: false
    },
    companyName: {
        type: String,
        required: [false, 'company_name_required'],
    },
    rate: {
        type: Number,
        required: true,
        default: 1,
    },
    activeBefore: {
        type: Date,
        required: true,
        default: new Date(new Date() + 1 * 24 * 60 * 60 * 1000),
    },
    loggedAt: {
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

module.exports = mongoose.model('User', userSchema)