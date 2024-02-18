const { StatusCodes } = require("http-status-codes");
const Image = require("../model/Image");

const getAllSkinImages = async (req, res) => {
  const skin_images = await Image.find({});
  res.status(StatusCodes.OK).json({ success: true, skin_images: skin_images });
};

module.exports = { getAllSkinImages };
