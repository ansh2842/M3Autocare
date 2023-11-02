const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    Userid:{
        type:String,
        required:true
    },
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    service:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    appointment_date:{
        type:String,
        required:true
    },
    carName:{
        type:String,
        required:true
    },
    CarNumber:{
        type:String,
        required:true
    },
    Appointment_id:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    remarks:{
        type:String,
        
    }
})

const Appointment =new mongoose.model('Appointment',appointmentSchema) 
module.exports = Appointment;