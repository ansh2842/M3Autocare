const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
   image:{
    type:String,
  
   },
   name:{
    type:String,

   },
    username:{
        type:String,
        required:true
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
        
    },
    password:{
        type:String,
        required:true
    }
    
}) 

userSchema.pre('save', async function(next) {
    try {
        
        if (!this.isModified('password')) {
            return next();
        }

  
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);


        this.password = hashedPassword;

        next();
    } catch (error) {
        return next(error);
    }
});
var userModel = new mongoose.model('userFront', userSchema)
module.exports = userModel