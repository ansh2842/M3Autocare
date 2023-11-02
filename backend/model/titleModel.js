const mongoose = require('mongoose')

const titleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    }
})

const Title = new mongoose.model('Title', titleSchema)

module.exports =Title