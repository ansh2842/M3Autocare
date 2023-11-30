const asyncHandler = require("express-async-handler");
const titleModel = require("../model/titleModel");

exports.titlepost = asyncHandler(async (req, res) => {
  const { title } = req.body;

  try {
    const addtitle = await titleModel.create({
      title: title,
    });
    res.json(addtitle);
  } catch (err) {
    console.log(err);
  }
});

exports.titleget = asyncHandler(async (req, res) => {
  try {
    const getTitle = await titleModel.find();
    res.json(getTitle);
  } catch (err) {
    console.log(err);
  }
});
exports.titlegetId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getTitleId = await titleModel.findById(id);
    res.json(getTitleId);
  } catch (err) {
    console.log(err);
  }
});

exports.titledelete = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deleteTitle = await titleModel.findByIdAndDelete(id);
    res.json(deleteTitle);
  } catch (err) {
    console.log(err);
  }
});
exports.titleEdit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const EditTitle = await titleModel.findById(id);
    EditTitle.title = title;
    let toUpdate = await EditTitle.save();
    res.json(toUpdate);
  } catch (err) {
    console.log(err);
  }
});
