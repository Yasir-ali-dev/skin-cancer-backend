const { StatusCodes } = require("http-status-codes");
const Image = require("../model/Image");
const { BadRequestError } = require("../errors");

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

module.exports = { getAllSkinImages, createSkinImage };
