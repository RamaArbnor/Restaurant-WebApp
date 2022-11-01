const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tableSchema = new Schema({
    orders: {
        type: [],
        default: [],
        required: true
    },
    label: {
        type: String,
        required: false
    },
    busy: {
        type: Boolean,
        default: false,
        required: true

    }

}, {timestamps: true})

module.exports = mongoose.model('Table', tableSchema)