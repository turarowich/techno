const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const branchSchema = new Schema({
    address: {
        type: String,
        required: [true, "name_required"],
        default: ""
    },
    name: {
        type: String,
        required: false,
        default: ""
    },
    longitude: {
        type: String,
        required: true,
        default: 0
    },
    latitude: {
        type: String,
        required: true,
        default: 0
    },
    phone: {
        type: String,
        required: [true, "phone_required"],
        default: ""
    },
    phone2: {
        type: String,
        required: false,
        default: ""
    },
    monday: {
        active:{
            type: Boolean,
            required: true
        },
        start: {
            type: String,
            required: true
        },
        end: {
            type: String,
            required: true
        },
    },
    tuesday: {
        active: {
            type: Boolean,
            required: true
        },
        start: {
            type: String,
            required: true
        },
        end: {
            type: String,
            required: true
        },
    },
    wednesday: {
        active: {
            type: Boolean,
            required: true
        },
        start: {
            type: String,
            required: true
        },
        end: {
            type: String,
            required: true
        },
    },
    thursday: {
        active: {
            type: Boolean,
            required: true
        },
        start: {
            type: String,
            required: true
        },
        end: {
            type: String,
            required: true
        },
    },
    friday: {
        active: {
            type: Boolean,
            required: true
        },
        start: {
            type: String,
            required: true
        },
        end: {
            type: String,
            required: true
        },
    },
    saturday: {
        active: {
            type: Boolean,
            required: true
        },
        start: {
            type: String,
            required: true
        },
        end: {
            type: String,
            required: true
        },
    },
    sunday: {
        active: {
            type: Boolean,
            required: true
        },
        start: {
            type: String,
            required: true
        },
        end: {
            type: String,
            required: true
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

module.exports = mongoose.model('Branch', branchSchema)