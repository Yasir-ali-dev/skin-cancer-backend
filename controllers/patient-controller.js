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

const getPatient = async (req, res) => {
  const patient_id_ = req.params.patient_id.slice(1);
  const patient = await Patient.findById(patient_id_);
  if (!patient) {
    throw new NotFoundError(`patient not found with id: ${patient_id_}`);
  }
  res.status(StatusCodes.OK).json({ status: true, patient: patient });
};

const deletePatient = async (req, res) => {
  const patient_id_ = req.params.patient_id.slice(1);
  const deleted_patient = await Patient.findByIdAndDelete(patient_id_);
  if (!deleted_patient) {
    throw new NotFoundError(`patient not found with id: ${patient_id_}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, deleted_patient: deleted_patient });
};

const updatePatient = async (req, res) => {
  const patient_id_ = req.params.patient_id.slice(1);
  const {
    name,
    age,
    phone,
    gender,
    cancer_acquired_date,
    date_of_birth,
    address,
    email,
  } = req.body;

  if (
    !name &&
    !age &&
    !phone &&
    !gender &&
    !cancer_acquired_date &&
    !date_of_birth &&
    !address &&
    !email
  ) {
    throw new BadRequestError(
      "please providename, age, phone, gender, cancer_acquired_date, date_of_birth, address or email to update"
    );
  }
  const updated_patient = await Patient.findByIdAndUpdate(
    patient_id_,
    req.body,
    {
      new: true,
    }
  );
  if (!updated_patient) {
    throw new NotFoundError(`image not found with id: ${patient_id_}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: true, updated_patient: updated_patient });
};

module.exports = {
  getAllPatients,
  createPatient,
  getPatient,
  deletePatient,
  updatePatient,
};
