const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Lesion = require("../model/Lesion");

const getAllLesions = async (req, res) => {
  const all_lesions = await Lesion.find({});
  res.status(StatusCodes.OK).json({ status: true, all_lesions: all_lesions });
};

const createLesion = async (req, res) => {
  const {
    lesion_type,
    lesion_location,
    lesion_color,
    lesion_size,
    lesion_texture,
  } = req.body;

  if (
    !lesion_type ||
    !lesion_location ||
    !lesion_color ||
    !lesion_size ||
    !lesion_texture
  ) {
    throw new BadRequestError(
      "please provide lesion_type, lesion_location, lesion_color, lesion_size,  lesion_texture,"
    );
  }
  //physicain image missing

  let newLesion;
  try {
    newLesion = await Lesion.create({
      lesion_type,
      lesion_location,
      lesion_color,
      lesion_size,
      lesion_texture,
    });
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
    throw new NotFoundError(`model not found with id: ${lesion_id_}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, deleted_lesion: deleted_lesion });
};

const updateFeedback = async (req, res) => {
  const feedback_id_ = req.params.feedback_id.slice(1);
  const { feedback_details, feedback_type } = req.body;
  if (!feedback_type && !feedback_details) {
    throw new BadRequestError(
      "please provide feedback_type or feedback_details to update"
    );
  }
  const updated_feedback = await Feedback.findByIdAndUpdate(
    feedback_id_,
    req.body,
    {
      new: true,
    }
  );
  if (!updated_feedback) {
    throw new NotFoundError(`model not found with id: ${feedback_id_}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, updated_feedback: updated_feedback });
};

module.exports = {
  getAllLesions,
  createLesion,
  deleteLesion,
  getLesion,
};
