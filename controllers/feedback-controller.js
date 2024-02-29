const { StatusCodes } = require("http-status-codes");
const { Model } = require("../model/Model");
const { BadRequestError, NotFoundError } = require("../errors");
const Feedback = require("../model/Feedback");
const Physician = require("../model/Physician");

const allFeedbacks = async (req, res) => {
  const allFeedbacks = await Feedback.find({});
  res
    .status(StatusCodes.OK)
    .json({ status: true, all_feedbacks: allFeedbacks });
};

const createFeedback = async (req, res) => {
  const { feedback_details, feedback_type, physician_id } = req.body;
  if (!feedback_type || !feedback_details) {
    throw new BadRequestError("please provide feedback_type, feedback_details");
  }
  const physician = await Physician.findById(physician_id);
  if (!physician) {
    throw new NotFoundError(`physician not found with id: ${physician_id}`);
  }

  let newFeedback;
  try {
    newFeedback = await Feedback.create({ feedback_details, feedback_type });
    physician.feedbacks.push(newFeedback);
    await physician.save();
  } catch (error) {
    console.log(error);
    throw new BadRequestError("please provide valid feedback_type");
  }
  res
    .status(StatusCodes.CREATED)
    .json({ status: true, new_feedback: newFeedback });
};

const getFeedback = async (req, res) => {
  const feedback_id_ = req.params.feedback_id.slice(1);
  const feedback = await Feedback.findById(feedback_id_);
  if (!feedback) {
    throw new NotFoundError(`model not found with id: ${feedback_id_}`);
  }
  res.status(StatusCodes.OK).json({ status: true, feedback: feedback });
};

const deleteFeedback = async (req, res) => {
  const feedback_id_ = req.params.feedback_id.slice(1);
  const deleted_feedback = await Feedback.findByIdAndDelete(feedback_id_);
  if (!deleted_feedback) {
    throw new NotFoundError(`model not found with id: ${feedback_id_}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, deleted_feedback: deleted_feedback });
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
  allFeedbacks,
  getFeedback,
  createFeedback,
  deleteFeedback,
  updateFeedback,
};
