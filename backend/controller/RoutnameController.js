const asyncHandler = require("express-async-handler");
const bannerModel = require("../model/bannerModel");
const BrandModel = require("../model/brandModel");
var serviceModel = require("../model/serviceModel");
const productModel = require("../model/productModel");
const categoryModel = require("../model/categoryModel");
const subcategoryModel = require("../model/subCategoryModel");
var userModel = require("../model/userModel");
const techModel = require("../model/technicianModel");
const aboutModel = require("../model/aboutModel");

exports.RouteName = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const RouteName =
      (await bannerModel.findOne({ _id: id })) ||
      (await BrandModel.findOne({ _id: id })) ||
      (await serviceModel.findOne({ _id: id })) ||
      (await productModel.findOne({ _id: id })) ||
      (await categoryModel.findOne({ _id: id })) ||
      (await subcategoryModel.findOne({ _id: id })) ||
      (await userModel.findOne({ _id: id })) ||
      (await techModel.findOne({ _id: id }));

    let name = RouteName.title || RouteName.name || RouteName.Title;

    res.json(name);
  } catch (err) {
    console.log(err);
  }
});
