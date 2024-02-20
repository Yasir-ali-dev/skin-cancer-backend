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

const getSkinImage = async (req, res) => {
  const image_id_ = req.params.image_id.slice(1);
  const image = await Image.findById(image_id_);
  if (!image) {
    throw new NotFoundError(`image not found with id: ${image_id_}`);
  }
  res.status(StatusCodes.OK).json({ status: true, image: image });
};

const deleteReport = async (req, res) => {
  const report_id_ = req.params.report_id.slice(1);
  const report = await Report.findByIdAndDelete(report_id_);
  if (!report) {
    throw new NotFoundError(`report not found with id: ${report_id_}`);
  }
  res.status(StatusCodes.OK).json({ status: true, deleted_report: report });
};
const updateReport = async (req, res) => {
  const report_id_ = req.params.report_id.slice(1);
  if (!req.body.report_generate_date && !req.body.report_details) {
    throw new BadRequestError(
      "please provide report_generate_date or report_details to update"
    );
  }
  console.log(report_id_);
  const report = await Report.findByIdAndUpdate(report_id_, req.body, {
    new: true,
  });
  console.log(report);
  if (!report) {
    throw new NotFoundError(`report not found with id: ${report_id_}`);
  }
  res.status(StatusCodes.OK).json({ status: true, updated_report: report });
};

module.exports = { getAllSkinImages, createSkinImage, getSkinImage };
