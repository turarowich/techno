const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schedulePushSchema = new Schema({
    clients: [{
        type: String,
        required: false,
        default: ""
    }],
    byWeek: {
        type: Boolean,
        required: false,
        default: true
    },
    sendToAll: {
        type: Boolean,
        required: false,
        default: false
    },
    isActive: {
        type: Boolean,
        required: false,
        default: false
    },
    title: {
        type: String,
        required: false,
        default: ""
    },
    monday: {
        isActive: {
            type: Boolean,
            required: true,
            default: false
        },
        push:[{
            time: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            desc: {
                type: String,
                required: true
            },
        }],
    },
    tuesday: {
        isActive: {
            type: Boolean,
            required: true,
            default: false
        },
        push: [{
            time: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            desc: {
                type: String,
                required: true
            },
        }],
    },
    wednesday: {
        isActive: {
            type: Boolean,
            required: true,
            default: false
        },
        push: [{
            time: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            desc: {
                type: String,
                required: true
            },
        }],
    },
    thursday: {
        isActive: {
            type: Boolean,
            required: true,
            default: false
        },
        push: [{
            time: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            desc: {
                type: String,
                required: true
            },
        }],
    },
    friday: {
        isActive: {
            type: Boolean,
            required: true,
            default: false
        },
        push: [{
            time: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            desc: {
                type: String,
                required: true
            },
        }],
    },
    saturday: {
        isActive: {
            type: Boolean,
            required: true,
            default: false
        },
        push: [{
            time: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            desc: {
                type: String,
                required: true
            },
        }],
    },
    sunday: {
        isActive: {
            type: Boolean,
            required: true,
            default: false
        },
        push: [{
            time: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            desc: {
                type: String,
                required: true
            },
        }],
    },
    
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

module.exports = mongoose.model('SchedulePush', schedulePushSchema)