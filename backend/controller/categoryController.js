const asyncHandler = require("express-async-handler");
const categoryModel = require("../model/categoryModel");

exports.postCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const imagePath = req.file.path;
  try {
    const AddCategory = await categoryModel.create({
      image: imagePath,
      Title: title,
    });
    res.json(AddCategory);
  } catch (err) {
    console.log(err);
  }
});

exports.getCategory = asyncHandler(async (req, res) => {
  try {
    const getItems = await categoryModel.find();
    res.json(getItems);
  } catch (err) {
    console.log(err);
  }
});

exports.getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getItems = await categoryModel.findById(id);
    res.json(getItems);
  } catch (err) {
    console.log(err);
  }
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const { Title } = req.body;
  const { id } = req.params;

  try {
    let updateItems = await categoryModel.findById(id);

    if (req.file) {
      const imagePath = req.file.path;
      updateItems.image = imagePath;
    }

    updateItems.Title = Title;

    let toUpdate = await updateItems.save();
    res.json(toUpdate);
  } catch (err) {
    console.log(err);
  }
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await categoryModel.findByIdAndRemove(id);
    console.log("category deleted");
  } catch (err) {
    console.log(err);
  }
});
