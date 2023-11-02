const mongoose = require('mongoose')

const TechnicianSchema =new mongoose.Schema({
    image:[{
        type:String,
        required:true,
    }],
    name:{
        type:String,
        required:true,
    },
    contact:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    specialised:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
    
})

const technicians= new mongoose.model('technician',TechnicianSchema)

module.exports = technicians