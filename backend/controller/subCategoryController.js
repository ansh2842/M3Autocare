const asyncHandler  = require('express-async-handler');
const subcategoryModel = require('../model/subCategoryModel');


exports.postsubCategory= asyncHandler(async(req,res) =>{

    const {title,brandname} = req.body;
    const imagePath = req.file.path;
    try{
        const AddCategory = await subcategoryModel.create({
            image: imagePath,
            Title:title,
            brandname:brandname
        })
        res.json(AddCategory);
        }catch(err){
            console.log(err);
    }
}) 

exports.getsubCategory = asyncHandler(async(req,res)=>{

    try{
        const getItems = await subcategoryModel.find()
        res.json(getItems);
    }catch(err){
        console.log(err);
    }
})

exports.getsubCategoryById = asyncHandler(async(req,res)=>{

    const {id} = req.params;
    try{
        const getItems = await subcategoryModel.findById(id)
        res.json(getItems);
    }catch(err){
        console.log(err);
    }


})

exports.updatesubCategory = asyncHandler(async(req,res)=>{

    const { Title,brandname} = req.body;
    
    const {id} = req.params;
    
    

    try{
        let updateItems = await subcategoryModel.findById(id)
        if(req.file){
            
            const imagePath = req.file.path;
            updateItems.image = imagePath;
        }
        updateItems.Title = Title;
        updateItems.brandname = brandname;

        let toUpdate = await updateItems.save()
        res.json(toUpdate);
    }catch(err){
        console.log(err)
    }
    
})

exports.deletesubCategory =  asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try{
        await subcategoryModel.findByIdAndRemove(id)
        console.log('category deleted')
    }catch(err){
        console.log(err)
    }
})