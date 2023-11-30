const asyncHandler = require("express-async-handler");
const subcategoryModel = require("../model/subCategoryModel");
const categoryModel = require("../model/categoryModel");

exports.postsubCategory = asyncHandler(async (req, res) => {
  const { title, brandname } = req.body;
  const imagePath = req.file.path;
  try {
    const AddCategory = await subcategoryModel.create({
      image: imagePath,
      Title: title,
      brandname: brandname,
    });
    res.json(AddCategory);
  } catch (err) {
    console.log(err);
  }
});

exports.getsubCategory = asyncHandler(async (req, res) => {
  try {
    
    const categories = await categoryModel.find();
    const getItems = await subcategoryModel.find().populate('brandname');
    const itemsWithCategoryTitle = getItems.map(item => {
      const categoryName = item.brandname;
      const category = categories.find(category => category._id.toString() === categoryName.toString());
      const categoryTitle = category ? category.Title : 'Category not found';
      return { ...item.toObject(), categoryTitle };
    });

    
    itemsWithCategoryTitle.forEach(item => {
      console.log(`Title: ${item.Title}, Category: ${item.categoryTitle}`);
    });

    res.json(itemsWithCategoryTitle);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



exports.getsubCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getItems = await subcategoryModel.findById(id);
    res.json(getItems);
  } catch (err) {
    console.log(err);
  }
});

exports.updatesubCategory = asyncHandler(async (req, res) => {
  const { Title, brandname } = req.body;

  const { id } = req.params;

  try {
    let updateItems = await subcategoryModel.findById(id);
    if (req.file) {
      const imagePath = req.file.path;
      updateItems.image = imagePath;
    }
    updateItems.Title = Title;
    updateItems.brandname = brandname;

    let toUpdate = await updateItems.save();
    res.json(toUpdate);
  } catch (err) {
    console.log(err);
  }
});

exports.deletesubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await subcategoryModel.findByIdAndRemove(id);
    console.log("category deleted");
  } catch (err) {
    console.log(err);
  }
});
