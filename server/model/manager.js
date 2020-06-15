const mongoose = require('mongoose')

const managerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    admin: {
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
            client: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Client'
            },
            file: {}
        }
    ],
    date_created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Manager', managerSchema)
