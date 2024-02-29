const { StatusCodes } = require("http-status-codes");
const { Model } = require("../model/Model");
const { BadRequestError, NotFoundError } = require("../errors");
const Feedback = require("../model/Feedback");
const Physician = require("../model/Physician");

const getAllPhysicians = async (req, res) => {
  const allPhysicians = await Physician.find({});
  res
    .status(StatusCodes.OK)
    .json({ status: true, all_physicians: allPhysicians });
};

const createPhysician = async (req, res) => {
  const { facility_center, name, specialization } = req.body;

  if (!facility_center || !name || !specialization) {
    throw new BadRequestError(
      "please provide facility_center, name and specialization"
    );
  }

  let newPhysician;
  try {
    newPhysician = await Physician.create(req.body);
  } catch (error) {
    console.log(error);
    throw new BadRequestError(`please provide valid feedback_type, ${error}`);
  }
  res
    .status(StatusCodes.CREATED)
    .json({ status: true, new_physician: newPhysician });
};

const getPhysician = async (req, res) => {
  const physician_id_ = req.params.physician_id.slice(1);
  const physician = await Physician.findById(physician_id_);
  if (!physician) {
    throw new NotFoundError(`physician not found with id: ${physician_id_}`);
  }
  res.status(StatusCodes.OK).json({ status: true, physician: physician });
};

// const deleteFeedback = async (req, res) => {
//   const feedback_id_ = req.params.feedback_id.slice(1);
//   const deleted_feedback = await Feedback.findByIdAndDelete(feedback_id_);
//   if (!deleted_feedback) {
//     throw new NotFoundError(`model not found with id: ${feedback_id_}`);
//   }
//   res
//     .status(StatusCodes.OK)
//     .json({ status: true, deleted_feedback: deleted_feedback });
// };

// const updateFeedback = async (req, res) => {
//   const feedback_id_ = req.params.feedback_id.slice(1);
//   const { feedback_details, feedback_type } = req.body;
//   if (!feedback_type && !feedback_details) {
//     throw new BadRequestError(
//       "please provide feedback_type or feedback_details to update"
//     );
//   }
//   const updated_feedback = await Feedback.findByIdAndUpdate(
//     feedback_id_,
//     req.body,
//     {
//       new: true,
//     }
//   );
//   if (!updated_feedback) {
//     throw new NotFoundError(`model not found with id: ${feedback_id_}`);
//   }
//   res
//     .status(StatusCodes.OK)
//     .json({ status: true, updated_feedback: updated_feedback });
// };

module.exports = {
  getAllPhysicians,
  getPhysician,
  createPhysician,
};
