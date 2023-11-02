var mongoose  =  require('mongoose')

const serviceSchema = new mongoose.Schema({

    image:{
        type:String,
        required:true 
    },
    Title:{
        type:String,
        required:true 
    }
})

const service  = new mongoose.model('ServiceCategory', serviceSchema)

module.exports = service