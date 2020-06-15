const mongoose = require('mongoose')

const settingSchema = new mongoose.Schema({
    status: {
        type: Array
    },
    industry: {
        type: Array
    },
    offer: {
        type: Array
    },
    geo: {
        type: Array
    }
})

module.exports = mongoose.model('Setting', settingSchema)
