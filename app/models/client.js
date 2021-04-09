const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'FirstName required'],
    },
    lastName: {
        type: String,
        required: [true, 'LastName required'],
    },
    phone: {
        type: String,
        required: false,
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
        required: false,
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
    birthDate: {
        type: Date,
        required: [true, 'Birthdate required'],
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
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    category: { 
        type: Schema.Types.ObjectId, 
        ref: 'Category' 
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
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