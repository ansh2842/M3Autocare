const asyncHandler = require("express-async-handler");
const techModel = require("../model/technicianModel");

exports.Addtechnician = asyncHandler(async (req, res) => {
  const { name, contact, email, specialised, description } = req.body;
  const imagePath = req.files.map((file) => file.path);

  try {
    const existingUser = await techModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ invalid: true, message: "Email already exists" });
    }

    const techAdd = await techModel.create({
      image: imagePath,
      name: name,
      contact: contact,
      email: email,
      specialised: specialised,
      description: description,
    });
    res.json(techAdd);
  } catch (err) {
    console.log(err);
  }
});

exports.getTechnician = asyncHandler(async (req, res) => {
  try {
    const getTech = await techModel.find();
    res.json(getTech);
  } catch (err) {
    console.log(err);
  }
});

exports.deleteTechnician = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deletes = await techModel.findByIdAndRemove(id);
    res.json(deletes);
    console.log(deletes);
  } catch (err) {
    console.log(err);
  }
});

exports.getEditTechnician = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const getbyId = await techModel.findById(id);
    res.json(getbyId);
  } catch (err) {
    console.log(err);
  }
});

exports.updateTechData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, contact, email, specialised, description } = req.body;

  try {
    const existingUser = await techModel.findOne({ email: email });

    if (existingUser && existingUser._id.toString() !== id) {
      return res
        .status(400)
        .json({ invalid: true, message: "Email already exists" });
    }

    let updateTech = await techModel.findById(id);

    if (req.files && req.files.length > 0) {
      const imagePath = req.files.map((file) => file.path);
      updateTech.image = imagePath;
    }
    (updateTech.name = name),
      (updateTech.contact = contact),
      (updateTech.email = email),
      (updateTech.specialised = specialised),
      (updateTech.description = description);

    let toSave = await updateTech.save();
    res.json(toSave);
  } catch (err) {
    console.log(err);
  }
});
