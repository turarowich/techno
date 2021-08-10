const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schedulePushSchema = new Schema({
    clients: [{
        type: Schema.Types.ObjectId,
        ref: 'Client'
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
            sendAt:{
                type: Date,
                required: false,
            }
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
            sendAt: {
                type: Date,
                required: false,
            }
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
            sendAt: {
                type: Date,
                required: false,
            }
        }],
    },
    thirsday: {
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
            sendAt: {
                type: Date,
                required: false,
            }
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
            sendAt: {
                type: Date,
                required: false,
            }
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
            sendAt: {
                type: Date,
                required: false,
            }
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
                required: false,
                default: ""
            },
            desc: {
                type: String,
                required: false,
                default: ""
            },
            sendAt: {
                type: Date,
                required: false,
            }
        }],
    },
    
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

module.exports = mongoose.model('SchedulePush', schedulePushSchema)