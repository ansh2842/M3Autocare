const mongoose = require('mongoose')

const cancelSchema = new mongoose.Schema({

    id:{
        type:String,
        required:true
    },
    reject:{
        type:String,
    },
    cancel:{
        type:String,
    },
    appointmentid:{
        type:String,
    }
})

const cancel = new mongoose.model('CancelAppointment',cancelSchema)

module.exports = cancel