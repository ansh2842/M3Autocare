var mongoose = require('mongoose');
const subCategorySchema = new mongoose.Schema({

  
    image:[{
        type:String,
        required:true 
    }],
    Title:{
        type:String,
        required:true 
    },
    brandname:{
        type:String,
        required:true
    }
})

var Subcategory = new mongoose.model('Subategory', subCategorySchema)

module.exports = Subcategory