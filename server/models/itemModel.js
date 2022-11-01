const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    image: {
        type: String,
        required: false

    }

}, {timestamps: true})

module.exports = mongoose.model('Item', itemSchema)