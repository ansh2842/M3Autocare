const mongoose = require('mongoose');
const techandAppointSchema = new mongoose.Schema({
  
        technicians:[{
            technicianId:{
                type:String,
                
            },
            startDate:{
                type:String,
              
            },
            endDate:{
                type:String,
               
            },
            comment:{
                type:String,
                
            },
            JobId:{
                type:Number,
            }
        },],
        appointmentId:{
           type: String,
           required:true
        },
        serviceId:{
            type:String,
            required:true
        
        }
        
        
  
})

const techandAppoint = new mongoose.model("TechnianAndAppointment",techandAppointSchema)

module.exports = techandAppoint