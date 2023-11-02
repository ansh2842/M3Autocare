const asyncHandler = require('express-async-handler')
var serviceModel =  require('../model/serviceModel')


exports.addService =  asyncHandler (async(req,res)=>{

    const { name, description, mrp, price} = req.body
    const imagePath = req.files.map(file => file.path)

    try{
        const addService = await serviceModel.create({

            image: imagePath,
            name: name,
            description: description,
            mrp: mrp,
            price: price

        })
        res.json(addService)
    }catch(err){
        console.log(err)
    }
})

exports.getService = asyncHandler (async(req,res) =>{

    try{
        const getService = await serviceModel.find()
        res.json(getService)
    }catch(err){
        console.log(err)
    }
})
exports.deleteService = asyncHandler (async(req,res) =>{

    const {id} = req.params

    try{

        const deleteService = await serviceModel.findByIdAndRemove(id)
        res.json(deleteService)
        console.log(deleteService)
    }catch(err){
        console.log(err)
    }
})

const mongoose = require('mongoose');

exports.getServiceData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    const editService = await serviceModel.findById(id);
    if (editService) {
      res.json(editService);
    } else {
      res.status(404).json({ error: 'Service not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


exports.updateServiceData = asyncHandler (async(req,res) =>{

    const {id} = req.params
    const {names,descriptions,mrps,prices} = req.body
    

    try{
        let updateService = await serviceModel.findById(id)
        
           
         if (req.files && req.files.length > 0) {
             const imagePath = req.files.map((file) => file.path);
                updateService.image = imagePath;
              }
        updateService.name = names,
        updateService.description = descriptions,
        updateService.mrp = mrps,
        updateService.price = prices

        let toSave =  await updateService.save()
        res.json(toSave)
    }catch(err){
        console.log(err)
    }
})