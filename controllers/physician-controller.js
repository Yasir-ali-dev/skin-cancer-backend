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

const deletePhysician = async (req, res) => {
  const physician_id_ = req.params.physician_id.slice(1);
  const deleted_physician = await Physician.findByIdAndDelete(physician_id_);
  if (!deleted_physician) {
    throw new NotFoundError(`physician not found with id: ${physician_id_}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, deleted_physician: deleted_physician });
};

const updatePhysician = async (req, res) => {
  const physician_id_ = req.params.physician_id.slice(1);
  const { facility_center, name, specialization } = req.body;
  if (!facility_center && !name && !specialization) {
    throw new BadRequestError(
      "please provide facility_center, name or specialization to update"
    );
  }
  const updated_physician = await Physician.findByIdAndUpdate(
    physician_id_,
    req.body,
    {
      new: true,
    }
  );
  if (!updated_physician) {
    throw new NotFoundError(`physician not found with id: ${feedback_id_}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, updated_physician: updated_physician });
};

module.exports = {
  getAllPhysicians,
  getPhysician,
  createPhysician,
  deletePhysician,
  updatePhysician,
};
