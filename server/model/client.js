const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        unique: true
    },
    manager_created: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Manager'
    },
    manager_current: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Manager'
    },
    status: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    geo: {
        type: String,
        required: true
    },
    offer: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    comments: [
        {
            text: String,
            date: Date,
            active: Boolean,
            manager: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Manager'
            },
            file: {}
        }
    ],
    date_created: {
        type: Date,
        default: Date.now
    },
    date_contact: {
        type: Date,
        required: true
    },
    contacts: [
        {
            name: String,
            job: String
        }
    ],
    fav: {
        type: Boolean,
        required: true
    },
    open: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Client', clientSchema)
