const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required'],
    },
    phone: {
        type: String,
        required: true,
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
            message: props => 'The specified phone address is already in use.'
        }
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
    password: {
        type: String,
        required: [true, 'Password required'],
        select: false
    },
    _db: {
        type: String,
        required: false,
        select: false
    },
    companyName: {
        type: String,
        required: [false, 'Company name required'],
    },
    logo: {
        type: String,
        required: [false, 'Logo required'],
    },
    description: {
        type: String,
        required: [true, 'Description required'],
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