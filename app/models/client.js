const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'name_required'],
        minlength: [3, 'name_min'],
    },
    phone: {
        type: String,
        required: [true, 'phone_required'],
        trim: true,
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
        trim: true,
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
    birthDate: {
        type: Date,
        required: [false, 'birthday_required'],
    },
    address: {
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
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    category: { 
        type: Schema.Types.ObjectId, 
        ref: 'Category' 
    },
    fb_id: {
        type: String,
        required: false,
        default: ''
    },
    google_id: {
        type: String,
        required: false,
        default: ''
    },
    twitter_id: {
        type: String,
        required: false,
        default: ''
    },
    gender: {
        type: String,
        required: false,
        default: ''
    },
    avatar: {
        type: String,
        required: false,
    },
    oneTimeCode: {
        type: String,
        required: false,
    },
    QRCode:{
        type: String,
        required: false,
        default: ""
    },
    uniqueCode: {
        type: String,
        required: true,
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

module.exports = mongoose.model('Client', clientSchema)