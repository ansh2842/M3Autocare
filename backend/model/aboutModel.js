const mongoose = require('mongoose');

const AboutSchema =  new mongoose.Schema({
    about:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    valuedata:{
        type:String,
        required:true
    },
    missiondata:{
        type:String,
        required:true
    },
    choosedata:{
        type:String,
        required:true
    },
    journeydata:{
        type:String,
        required:true
    }

})

const About = new mongoose.model('About',AboutSchema)

module.exports = About