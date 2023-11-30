const asyncHandler = require("express-async-handler");
const BrandModel = require("../model/brandModel");

exports.BrandAdd = asyncHandler(async (req, res) => {
  const { title, category, subCategory } = req.body;
  const imagePath = req.file.path;

  try {
    const brand = await BrandModel.create({
      image: imagePath,
      title: title,
    });
    res.json(brand);
  } catch (err) {
    console.error(err);
  }
});

exports.getBrand = asyncHandler(async (req, res) => {
  try {
    const getBrand = await BrandModel.find();
    res.json(getBrand);
  } catch (err) {
    console.error(err);
  }
});

exports.deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await BrandModel.findByIdAndRemove(id);
    console.log("deleted");
  } catch (err) {
    console.error(err);
  }
});

exports.getBrandById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const getBrandById = await BrandModel.findById(id);
    res.json(getBrandById);
  } catch (err) {
    console.log(err);
  }
});

exports.updateBrand = asyncHandler(async (req, res) => {
  const { title, category, subCategory } = req.body;
  const { id } = req.params;

  try {
    let updateItems = await BrandModel.findById(id);

    if (req.file) {
      const imagePath = req.file.path;
      updateItems.image = imagePath;
    }

    updateItems.title = title;
    let toUpdate = await updateItems.save();
    res.json(toUpdate);
  } catch (err) {
    console.log(err);
  }
});
