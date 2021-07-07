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
                required: false,
                default: ""
            },
            title: {
                type: String,
                required: false,
                default: ""
            },
            desc: {
                type: String,
                required: false,
                default: ""
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
                required: false,
                default: ""
            },
            title: {
                type: String,
                required: false,
                default: ""
            },
            desc: {
                type: String,
                required: false,
                default: ""
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
                required: false,
                default: ""
            },
            title: {
                type: String,
                required: false,
                default: ""
            },
            desc: {
                type: String,
                required: false,
                default: ""
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
                required: false,
                default: ""
            },
            title: {
                type: String,
                required: false,
                default: ""
            },
            desc: {
                type: String,
                required: false,
                default: ""
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
                required: false,
                default: ""
            },
            title: {
                type: String,
                required: false,
                default: ""
            },
            desc: {
                type: String,
                required: false,
                default: ""
            },
        }],
    },
    saturday: {
        isActive: {
            type: Boolean,
            required: false,
            default: false
        },
        push: [{
            time: {
                type: String,
                required: false,
                default: ""
            },
            title: {
                type: String,
                required: false,
                default: ""
            },
            desc: {
                type: String,
                required: false,
                default: ""
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
                required: false,
                default: ""
            },
            title: {
                type: String,
                required: true,
                default: ""
            },
            desc: {
                type: String,
                required: true,
                default: ""
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