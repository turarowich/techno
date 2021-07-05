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
    monday: [{
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
    tuesday: [{
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
    wednesday: [{
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
    thursday: [{
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
    friday: [{
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
    saturday: [{
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
    sunday: [{
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
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

module.exports = mongoose.model('SchedulePush', schedulePushSchema)