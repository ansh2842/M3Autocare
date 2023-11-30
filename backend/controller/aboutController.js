const asyncHandler = require("express-async-handler");
const aboutModel = require("../model/aboutModel");

exports.addAboutPost = asyncHandler(async (req, res) => {
  const { about, valueData, missionData, chooseData, journeyData } = req.body;
  console.log(req.body);
  const imagePath = req.file.path;

  try {
    const AboutAdd = await aboutModel.create({
      about: about,
      image: imagePath,
      valuedata: valueData,
      missiondata: missionData,
      choosedata: chooseData,
      journeydata: journeyData,
    });
    res.json(AboutAdd);
  } catch (err) {
    console.log(err);
  }
});

exports.getAbout = asyncHandler(async (req, res) => {
  try {
    const getData = await aboutModel.find();
    res.json(getData);
  } catch (err) {
    console.log(err);
  }
});

exports.deleteAbout = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deletes = await aboutModel.findByIdAndRemove(id);
    res.json(deletes);
  } catch (err) {
    console.log(err);
  }
});

exports.getAboutbyId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const aboutGet = await aboutModel.findById(id);
    res.json(aboutGet);
  } catch (err) {
    console.log(err);
  }
});

exports.editByID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    about,
    head,
    value,
    mission,
    valuedata,
    missiondata,
    choose,
    journey,
    choosedata,
    journeydata,
  } = req.body;

  try {
    const update = await aboutModel.findById(id);
    if (req.file) {
      const imagePath = req.file.path;
      update.image = imagePath;
    }

    (update.about = about),
      (update.valuedata = valuedata),
      (update.missiondata = missiondata);
    (update.choosedata = choosedata), (update.journeydata = journeydata);

    var toUpdate = await update.save();

    res.json(toUpdate);
  } catch (err) {
    console.log(err);
  }
});
