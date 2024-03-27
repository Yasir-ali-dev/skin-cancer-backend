const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const { Lesion } = require("../model/Lesion");
const Report = require("../model/Report");

const getAllLesions = async (req, res) => {
  const all_lesions = await Lesion.find({});
  res.status(StatusCodes.OK).json({ status: true, all_lesions: all_lesions });
};

// image embedding is missing
const createLesion = async (req, res) => {
  const { lesion_type, lesion_severity, report_id } = req.body;
  if (!lesion_type || !lesion_severity) {
    throw new BadRequestError("please provide lesion_type, lesion_severity");
  }
  const report = await Report.findById(report_id);
  if (!report_id) {
    throw new NotFoundError(`report not found with id: ${report_id}`);
  }

  let newLesion;
  try {
    newLesion = await Lesion.create({
      lesion_type,
      lesion_severity,
    });

    report.lesion = newLesion;
    await report.save();
  } catch (error) {
    console.log(error);
    throw new BadRequestError(`please provide ${error}`);
  }
  res.status(StatusCodes.CREATED).json({ status: true, new_lesion: newLesion });
};

const getLesion = async (req, res) => {
  const lesion_id_ = req.params.lesion_id.slice(1);
  const lesion = await Lesion.findById(lesion_id_);
  if (!lesion) {
    throw new NotFoundError(`lesion not found with id: ${lesion_id_}`);
  }
  res.status(StatusCodes.OK).json({ status: true, lesion: lesion });
};

const deleteLesion = async (req, res) => {
  const lesion_id_ = req.params.lesion_id.slice(1);
  const deleted_lesion = await Lesion.findByIdAndDelete(lesion_id_);
  if (!deleted_lesion) {
    throw new NotFoundError(`lesion not found with id: ${lesion_id_}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, deleted_lesion: deleted_lesion });
};

const updateLesion = async (req, res) => {
  const lesion_id_ = req.params.lesion_id.slice(1);
  const {
    lesion_type,
    lesion_location,
    lesion_color,
    lesion_size,
    lesion_texture,
  } = req.body;
  if (
    !lesion_type &&
    !lesion_location &&
    !lesion_color &&
    !lesion_size &&
    !lesion_texture
  ) {
    throw new BadRequestError(
      "please provide lesion_type, lesion_location, lesion_color, lesion_size or  lesion_texture to update"
    );
  }
  const updated_lesion = await Lesion.findByIdAndUpdate(lesion_id_, req.body, {
    new: true,
  });
  if (!updated_lesion) {
    throw new NotFoundError(`lesion not found with id: ${lesion_id_}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, updated_lesion: updated_lesion });
};

module.exports = {
  getAllLesions,
  createLesion,
  deleteLesion,
  getLesion,
  updateLesion,
};
