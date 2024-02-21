const { StatusCodes } = require("http-status-codes");
const Image = require("../model/Image");
const { BadRequestError, NotFoundError } = require("../errors");
const Patient = require("../model/Patient");

const getAllPatients = async (req, res) => {
  const patients = await Patient.find({});
  res.status(StatusCodes.OK).json({ success: true, patients: patients });
};

const createPatient = async (req, res) => {
  const { name, age, phone, gender } = req.body;
  if (!name || !age || !phone || !gender) {
    throw new BadRequestError("please provide name, age, phone and gender");
  }
  let patient;
  try {
    patient = await Patient.create(req.body);
  } catch (error) {
    console.log(error);
    throw new BadRequestError(
      "please provide valid name, age, phone and gender"
    );
  }
  res.status(StatusCodes.CREATED).json({ success: true, patient: patient });
};

const getSkinImage = async (req, res) => {
  const image_id_ = req.params.image_id.slice(1);
  const image = await Image.findById(image_id_);
  if (!image) {
    throw new NotFoundError(`image not found with id: ${image_id_}`);
  }
  res.status(StatusCodes.OK).json({ status: true, image: image });
};

const deleteImage = async (req, res) => {
  const image_id_ = req.params.image_id.slice(1);
  const deleted_image = await Image.findByIdAndDelete(image_id_);
  if (!deleted_image) {
    throw new NotFoundError(`image not found with id: ${image_id_}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, deleted_image: deleted_image });
};

const updateSkinImage = async (req, res) => {
  const image_id_ = req.params.image_id.slice(1);
  const { image_url, image_source, captured_date } = req.body;
  if (!image_source && !image_url && !captured_date) {
    throw new BadRequestError(
      "please provide image_url, image_source or captured_date to update"
    );
  }
  const updated_image = await Image.findByIdAndUpdate(image_id_, req.body, {
    new: true,
  });
  if (!updated_image) {
    throw new NotFoundError(`image not found with id: ${image_id_}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, updated_image: updated_image });
};

module.exports = {
  getAllPatients,
  createPatient,
};