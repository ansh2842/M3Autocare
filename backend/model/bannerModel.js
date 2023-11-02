var mongoose = require('mongoose')
var bannerSchema = new mongoose.Schema({

    image:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

var banner = new mongoose.model('Banner', bannerSchema)

module.exports = banner