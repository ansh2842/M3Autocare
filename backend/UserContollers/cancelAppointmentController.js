const asyncHandler =  require('express-async-handler')
const cancelAppModel = require('../userModel/cancelAppointemt')

exports.cancelAppData=asyncHandler(async(req,res)=>{

    const {id}= req.body
    

    try{
        let canceldata = await cancelAppModel.create({
            id: id,
            
        })
        res.json(canceldata)
    }catch(err){
        console.error(err)
    }
})

exports.cancelrqst =asyncHandler(async(req,res)=>{

    try{
        const data = await cancelAppModel.find()
        res.json(data)
    }catch(err){
        console.error(err)
    }
})

exports.cancelreject= asyncHandler(async(req,res)=>{

    const {id}= req.params
    const {reject} = req.body

    console.log(id)

    try{
        const data = await cancelAppModel.findOne({id:id})
        console.log(data)
        if(data){
            data.id ="undefined"
            data.appointmentid = id
            data.reject = reject

           

            let Tosave = await data.save()
            res.json(Tosave)
        }
        console.log(data)
    }catch(err){
        console.error(err)
    }
})

exports.getappReport = asyncHandler(async (req, res) => {
    try {
        const data = await cancelAppModel.find({ $or: [{ cancel: "Cancelled" }, { reject: "Rejected" }] });
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


