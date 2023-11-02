const asycnHandler = require('express-async-handler')
const AppModel =  require('../userModel/appointementModel')
const nodemailer = require('nodemailer');
const emailUsername = 'm3autocare20@gmail.com';
const emailPassword = 'fozbfuwnpjfjfpbr';


exports.appointmentAdd = asycnHandler(async(req,res)=>{

    const{username,email,contact,location,service,price,date,carName,carNo,id,status,remarks}=req.body
    console.log(req.body)
    const AppointmentID = Date.now();
    console.log("00000000000",AppointmentID);
    try{
        const appointmentAdd = await AppModel.create({
            name: username,
            email: email,   
            contact: contact,
            location: location,
            service: service,
            price: price,
            appointment_date:date,
            carName: carName,
            CarNumber: carNo,
            Appointment_id: AppointmentID,
            Userid:id,
            status: status,
            remarks: remarks
        })
            if(res.statusCode ===200){

                const transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    host:'smtp.gmail.com',
                    auth: {
                      user: emailUsername, 
                      pass: emailPassword, 
                    },
                  });
              
                  const info = await transporter.sendMail({
                      from: '"M3 auto care" <m3autocare20@gmail.com>',
                      to: email,
                      subject: 'Appointment ',
                      html: `<strong>m3 Autocare:</strong> Your Appointment ID is <strong>${AppointmentID}</strong>.
                      We received your appointment you can check your appointment status with your APPOINTMENT ID  <br><strong>m3 Autocare</strong>`,
                    });
            }

        console.log("111111111",appointmentAdd)
        res.json(appointmentAdd)
    }catch(err){
        console.log(err)
    }
})

exports.getAppointmentData = async (req, res) => {
    const { id } = req.params;

    try {
        const Find = await AppModel.find({ Userid: id });
        res.json(Find)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getappdatas = asycnHandler(async(req,res)=>{
    try{
        const getapp = await AppModel.find()
        res.json(getapp);
    }catch (err) {
        console.log(err);
    }
})

exports.updateStatustData = asycnHandler(async(req,res)=>{

    const {id } = req.params;
    const {newstatus} = req.body;

    try{
        const Findstatus = await AppModel.findOne({Appointment_id:id})

        if(!Findstatus){
           res.status(404).json({status:'something went wrong'})
        }else  {
           Findstatus.status = newstatus;
           let toUpdate = Findstatus.save()
           res.json(toUpdate)
        }
    }catch (err) {
        console.log(err);
    }
})

exports.getTrackData =asycnHandler(async(req,res)=>{
    const {id} = req.params
    console.log(id)

    try{
        const FindTrack = await AppModel.findOne({Appointment_id:id})
        console.log(FindTrack)
        if(!FindTrack){
            res.status(404).json({message:'invalid Appointment Id'})
        }
        res.json(FindTrack)
    }catch(err){
        console.log(err);
    }
})

exports.getappdatasByID= asycnHandler(async(req,res)=>{
    const {id} = req.params

    try{
        const data = await AppModel.findById(id)
        res.json(data)
    }catch(err){
        console.log(err);
    }
})