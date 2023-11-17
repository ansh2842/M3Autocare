const asyncHandler = require('express-async-handler');
const techAndAppModel = require('../model/techAndappointModel');

let nextJobId = 102842;

exports.updateTechandDate = asyncHandler(async (req, res) => {
    const { technicianId, startDate, endDate, Appointmentid, comment, serviceid } = req.body;

    try {
        let existingTechAndApp = await techAndAppModel.findOne({ appointmentId: Appointmentid });

        nextJobId++;
        nextJobId += Math.floor(Math.random() * 900);

        let technicianWithSameJobId = existingTechAndApp?.technicians.find(
            (tech) => tech.JobId === nextJobId
        );

        while (technicianWithSameJobId) {

            nextJobId++;
            nextJobId += Math.floor(Math.random() * 900);
            technicianWithSameJobId = existingTechAndApp?.technicians.find(
                (tech) => tech.JobId === nextJobId
            );
        }

        const technician = {
            technicianId: technicianId,
            startDate: startDate,
            endDate: endDate,
            comment: comment,
            JobId: nextJobId,
        };

        if (existingTechAndApp) {
            existingTechAndApp.technicians.push(technician);
            await existingTechAndApp.save();
            res.json(existingTechAndApp);
        } else {
            const techAndApp = await techAndAppModel.create({
                appointmentId: Appointmentid,
                serviceId: serviceid,
                technicians: [technician],
            });
            res.json(techAndApp);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create or update technician information' });
    }
});


exports.getTechandDate =asyncHandler(async(req,res)=>{
    try{
        const data = await techAndAppModel.find()
        res.json(data);
    }catch (err) {
        console.error(err);
    }
})
exports.getTechandDataByid =asyncHandler(async(req,res)=>{
    const {id} = req.params; 
    console.log(req.params)

    try{
        const data = await techAndAppModel.findOne({appointmentId:id})
        console.log(data)
        res.json(data);
    }catch (err) {
        console.error(err);
    }
})

exports.getDataByids = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const documents = await techAndAppModel.find({ 'technicians.technicianId': id });
       

        if (documents.length > 0) {
            
            const technicianDataArray = [];

          
            documents.forEach(document => {
                document.technicians.forEach(tech => {
                    if (tech.technicianId === id) {
                        
                        technicianDataArray.push({
                            appointmentId: document.appointmentId, 
                            startDate: tech.startDate, 
                            endDate: tech.endDate ,
                            comment:tech.comment,
                            jobId:tech.JobId,
                            serviceId:document.serviceId
                        });
                    }
                });
            });

            if (technicianDataArray.length > 0) {
                res.json(technicianDataArray);
            } else {
                res.status(404).json({ error: 'Technician not found' });
            }
        } else {
            res.status(405).json({ error: 'No documents found with the given ID' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.TechandDeleteByid = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const result = await techAndAppModel.find();

        if (result) {
            for (const doc of result) {
                const technicianIndex = doc.technicians.findIndex(tech => tech._id.toString() === id);
                if (technicianIndex !== -1) {
                   
                    doc.technicians.splice(technicianIndex, 1);

              
                    const updatedDoc = await doc.save();
                    res.json(updatedDoc);
                    return; 
                }
            }
            res.status(404).json({ error: 'Technician not found with the given ID' });
        } else {
            res.status(404).json({ error: 'Document not found with the given ID' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




