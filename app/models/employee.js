const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'name_required'],
        minlength: [3, 'name_min'],
    },
    phone: {
        type: String,
        required: false,
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
    },
    comment: {
        type: String,
        required: false,
        default: ''
    },
    avatar: {
        type: String,
        required: false,
    },
    birthDate: {
        type: Date,
        required: [false, 'birthday_required'],
    },
    averageCheck: {
        type: Number,
        required: true,
        default: 0
    },
    isBlocked: {
        type: Boolean,
        required: false,
        default: false
    },
    orders: {
        active: {
            type: Boolean,
            required: true,
            default: true
        },
        canEdit: {
            type: Boolean,
            required: true,
            default: true
        },
    },
    settings: {
        active: {
            type: Boolean,
            required: true,
            default: true
        },
        canEdit: {
            type: Boolean,
            required: true,
            default: true
        },
    },
    analytics: {
        active: {
            type: Boolean,
            required: true,
            default: true
        },
        canEdit: {
            type: Boolean,
            required: true,
            default: true
        },
    },
    clients: {
        active: {
            type: Boolean,
            required: true,
            default: true
        },
        canEdit: {
            type: Boolean,
            required: true,
            default: true
        },
    },
    news: {
        active: {
            type: Boolean,
            required: true,
            default: true
        },
        canEdit: {
            type: Boolean,
            required: true,
            default: true
        },
    },
    catalog: {
        active: {
            type: Boolean,
            required: true,
            default: true
        },
        canEdit: {
            type: Boolean,
            required: true,
            default: true
        },
    },
    chat: {
        active: {
            type: Boolean,
            required: true,
            default: true
        },
        canEdit: {
            type: Boolean,
            required: true,
            default: true
        },
    },
    loyalty: {
        active: {
            type: Boolean,
            required: true,
            default: true
        },
        canEdit: {
            type: Boolean,
            required: true,
            default: true
        },
    },
    logs: {
        active: {
            type: Boolean,
            required: true,
            default: true
        },
        canEdit: {
            type: Boolean,
            required: true,
            default: true
        },
    },
    canAddPoint: {
        type: Boolean,
        required: true,
        default: true
    },
    canDeductPoint: {
        type: Boolean,
        required: true,
        default: true
    },
    canChangeOrderStatus: {
        type: Boolean,
        required: true,
        default: true
    },
    canSendPush: {
        type: Boolean,
        required: true,
        default: true
    },
    canScanQR: {
        type: Boolean,
        required: true,
        default: true
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

module.exports = mongoose.model('Employee', employeeSchema)