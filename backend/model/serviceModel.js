const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({

    image: [{
        type: String,
        required: true

    }],
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    mrp:{
            type: Number,
            required: true
    },
    price:{
        type: Number,
        required: true
    }
})

const service = new mongoose.model('service', serviceSchema)
module.exports = service