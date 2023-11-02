var mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact :{
        type:Number,
        required:true 
    },
    password:{
        type:String,
        required:true
    }
})

const Admin = mongoose.model('Userdata', adminSchema); 

module.exports = Admin;


