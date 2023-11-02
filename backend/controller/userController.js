var asyncHandler = require('express-async-handler')
var userModel = require('../model/userModel')



exports.userLogin = asyncHandler(async(req,res)=>{
        const{name,email,contact,password} = req.body

    try{

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
          return res.status(400).json({invalid:true, message: 'Email already exists' });
        }

        const data = await userModel.create({
               name:name,
               email:email,
               contact:contact,
               password:password
        }) 
        res.json(data)
        console.log(data)
    }catch(err){
        console.log(err)
    }
}),


exports.getDatas = asyncHandler (async(req,res) =>{

    try{
        const data = await userModel.find()
        res.json(data)
    }catch(err){
        console.log(err)
    }
})

exports.signupDelete = asyncHandler(async(req,res)=>{
    const{id} = req.params;
    try{
        await userModel.findByIdAndRemove(id);
        console.log("user deleted");
    }catch(err){
        console.log(err)
    }
})

exports.getLIstbyIds = asyncHandler(async(req,res)=>{
    
    const {id} = req.params;
    try{
        let lists = await userModel.findById(id)
        res.json(lists)
    }catch(err){
        console.log(err)
    }
})

exports.getUpdateByIds = asyncHandler(async (req, res) => {
    const { name, email, contact, password } = req.body;
    const { id } = req.params;

    try {
        
        const existingUser = await userModel.findOne({ email: email });

        if (existingUser && existingUser._id.toString() !== id) {
            return res.status(400).json({ invalid: true, message: 'Email already exists' });
        }

    
        let update = await userModel.findById(id);
        if (!update) {
            return res.status(404).json({ message: 'User not found' });
        }

        update.name = name;
        update.email = email;
        update.contact = contact;
        update.password = password;

        let toUpdate = await update.save();
        res.json(toUpdate);
        console.log(toUpdate);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server error' });
    }
});



    