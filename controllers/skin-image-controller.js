const { StatusCodes } = require("http-status-codes");
const Image = require("../model/Image");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllSkinImages = async (req, res) => {
  const skin_images = await Image.find({});
  res.status(StatusCodes.OK).json({ success: true, skin_images: skin_images });
};

const createSkinImage = async (req, res) => {
  const { image_url, image_source, captured_date } = req.body;
  if (!image_url || !captured_date || !image_source) {
    throw new BadRequestError(
      "please provide image_url, image_source, captured_date"
    );
  }
  let skin_image;
  try {
    skin_image = await Image.create({ image_source, image_url, captured_date });
  } catch (error) {
    console.log(error);
    throw new BadRequestError(
      "please provide valid image_url, image_source, captured_date!"
    );
  }
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, skin_image: skin_image });
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
  getAllSkinImages,
  createSkinImage,
  getSkinImage,
  deleteImage,
  updateSkinImage,
};
