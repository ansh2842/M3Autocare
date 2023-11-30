const asyncHandler = require("express-async-handler");
const productModel = require("../model/productModel");

exports.postProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    category,
    subcategory,
    description,
    quantity,
    mrp,
    price,
  } = req.body;
  const imagePath = req.files.map((file) => file.path);

  try {
    const products = await productModel.create({
      image: imagePath,
      name: name,
      Category: category,
      brand: brand,
      subcategory: subcategory,
      description: description,
      quantity: quantity,
      mrp: mrp,
      price: price,
    });

    console.log(products);
    res.json(products);
  } catch (err) {
    console.error("Error creating product:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

exports.getProduct = asyncHandler(async (req, res) => {
  try {
    const getProduct = await productModel.find();
    res.json(getProduct);
  } catch (err) {
    console.log(err);
  }
});

exports.getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const getProductByIds = await productModel.findById(id);
    res.json(getProductByIds);
  } catch (err) {
    console.log(err);
  }
});

exports.editProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    names,
    brands,
    category,
    subcategorys,
    descriptions,
    quantitys,
    mrps,
    prices,
  } = req.body;

  try {
    let updateProduct = await productModel.findById(id);

    if (req.files && req.files.length > 0) {
      const imagePath = req.files.map((file) => file.path);
      updateProduct.image = imagePath;
    }

    updateProduct.name = names;
    updateProduct.brand = brands;
    updateProduct.Category = category;
    updateProduct.subcategory = subcategorys;
    updateProduct.description = descriptions;
    updateProduct.quantity = quantitys;
    updateProduct.mrp = mrps;
    updateProduct.price = prices;

    let toUpdate = await updateProduct.save();
    res.json(toUpdate);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const removeProduct = await productModel.findByIdAndRemove(id);
    res.json(removeProduct);
  } catch (err) {
    console.log(err);
  }
});

exports.ProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const getProductById = await productModel.findById(id);
    res.json(getProductById);
  } catch (err) {
    console.log(err);
  }
});

exports.filterProducts = asyncHandler(async (req, res) => {
  const id = req.query.category;
  
  try {
    const query = {};
    if (id) {
      query.Category = id;
    }

    let products = await productModel.find(query);
    res.json(products);
  } catch (err) {
    console.error(err);
  }
});
