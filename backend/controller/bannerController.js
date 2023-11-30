const asyncHandler = require("express-async-handler");
const bannerModel = require("../model/bannerModel");
const { request } = require("express");

exports.bannerAdds = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const imagePath = req.file.path;

  try {
    const bannerAdd = await bannerModel.create({
      image: imagePath,
      title: title,
      description: description,
    });
    res.json(bannerAdd);
  } catch (err) {
    console.log(err);
  }
});

exports.bannerGet = asyncHandler(async (req, res) => {
  try {
    const bannerGet = await bannerModel.find();
    res.json(bannerGet);
  } catch (err) {
    console.log(err);
  }
});
exports.bannerGetbyId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const bannerGetbyId = await bannerModel.findById(id);
    res.json(bannerGetbyId);
  } catch (err) {
    console.log(err);
  }
});
exports.bannerDelete = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const bannerDelete = await bannerModel.findByIdAndRemove(id);
    res.json(bannerDelete);
  } catch (err) {
    console.log(err);
  }
});

exports.bannerUpdatebyId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const update = await bannerModel.findById(id);
    if (req.file) {
      const imagePath = req.file.path;
      update.image = imagePath;
    }
    console.log(req.file);

    (update.title = title), (update.description = description);
    const toUpdate = await update.save();
    res.json(toUpdate);
  } catch (err) {
    console.log(err);
  }
});
