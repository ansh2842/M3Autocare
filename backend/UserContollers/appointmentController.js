const asyncHandler = require("express-async-handler");
const AppModel = require("../userModel/appointementModel");
const nodemailer = require("nodemailer");
const emailUsername = "m3autocare20@gmail.com";
const emailPassword = "fozbfuwnpjfjfpbr";
const cancelAppModel = require('../userModel/cancelAppointemt')

exports.appointmentAdd = asyncHandler(async (req, res) => {
  const {
    username,
    email,
    contact,
    location,
    service,
    price,
    date,
    carName,
    carNo,
    id,
    status,
    remarks,
  } = req.body;
  console.log(req.body);
  const AppointmentID = Date.now() + Math.floor(Math.random() * 1100);

  console.log("00000000000", AppointmentID);
  try {
    const appointmentAdd = await AppModel.create({
      name: username,
      email: email,
      contact: contact,
      location: location,
      service: service,
      price: price,
      appointment_date: date,
      carName: carName,
      CarNumber: carNo,
      Appointment_id: AppointmentID,
      Userid: id,
      status: status,
      remarks: remarks,
    });
    if (res.statusCode === 200) {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        auth: {
          user: emailUsername,
          pass: emailPassword,
        },
      });

      const info = await transporter.sendMail({
        from: '"M3 auto care" <m3autocare20@gmail.com>',
        to: email,
        subject: "Appointment ",
        html: `<strong>m3 Autocare:</strong> Your Appointment ID is <strong>${AppointmentID}</strong>.
                      We received your appointment you can check your appointment status with your APPOINTMENT ID  <br><strong>m3 Autocare</strong>`,
      });
    }

    console.log("111111111", appointmentAdd);
    res.json(appointmentAdd);
  } catch (err) {
    console.log(err);
  }
});

exports.getAppointmentData = async (req, res) => {
  const { id } = req.params;

  try {
    const Find = await AppModel.find({ Userid: id });
    res.json(Find);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getappdatas = asyncHandler(async (req, res) => {
  try {
    const getapp = await AppModel.find();
    res.json(getapp);
  } catch (err) {
    console.log(err);
  }
});

exports.updateStatustData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { newstatus } = req.body;

  try {
    const Findstatus = await AppModel.findOne({ Appointment_id: id });

    if (!Findstatus) {
      res.status(404).json({ status: "something went wrong" });
    } else {
      Findstatus.status = newstatus;
      let toUpdate = Findstatus.save();
      res.json(toUpdate);
    }
  } catch (err) {
    console.log(err);
  }
});

exports.getTrackData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const FindTrack = await AppModel.findOne({ Appointment_id: id });
    console.log(FindTrack);
    if (!FindTrack) {
      res.status(404).json({ message: "invalid Appointment Id" });
    }
    res.json(FindTrack);
  } catch (err) {
    console.log(err);
  }
});

exports.getappdatasByData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const data = await AppModel.findById(id);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

exports.getTechandDateByid = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const dataByid = await AppModel.findById(id);
    res.json(dataByid);
  } catch (err) {
    console.error(err);
  }
});

exports.getappdatasByID = asyncHandler(async (req, res) => {
  const id = req.query.service;
  const carname = req.query.carname;

  try {
    const query = {};
    const data = new RegExp(carname, "i");

    if (id) {
      query.service = id;
    } else if (data) {
      query.$or = [
        { name: data },
        { carName: data },
        { CarNumber: data },
        { location: data },
      ];
    }

    let datas = await AppModel.find(query);
    res.json(datas);
  } catch (err) {
    console.error(err);
  }
});
exports.getappReportFilter = asyncHandler(async (req, res) => {
  const id = req.query.service;
  const name = req.query.name;
  console.log(id);

  try {
    const query = {};
    const data = new RegExp(name, "i");
    if (id) {
      query.service = id;
    } else if (name) {
      query.$or = [
        { name: data },
        { carName: data },
        { CarNumber: data },
        { location: data },
      ];
    }
    let datas = await AppModel.find(query);
    res.json(datas);
  } catch (err) {
    console.log(err);
  }
});

exports.updateCancel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {cancels} = req.body;
  console.log(id);

  try {
    const data = await AppModel.findOne({ _id: id });
    const cancel = await cancelAppModel.findOne({ id: id });
    
        cancel.cancel =cancels

        let Tosave = await cancel.save();
        res.json(Tosave);
    
    
    if (data.status === "Received" || data.status === "Seeking Issue") {
      data.status = "Cancelled";
      
      let toUpdate = await data.save();
      res.json(toUpdate);
      console.log(data);
    } else {
      res.status(400).json({ error: "Invalid status for cancellation" });
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: "Internal Server Error" });
  }
});

exports.feedback = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { star, Feedback } = req.body;

  try {
    const feedback = await AppModel.findById(id);

    (feedback.rating = star), (feedback.Feedback = Feedback);

    let toUpdate = await feedback.save();
    res.json(toUpdate);
    console.log("sssssssss", feedback);
  } catch (err) {
    console.log(err);
  }
});

