const { StatusCodes } = require("http-status-codes");
const Report = require("../model/Report");
const { BadRequestError, NotFoundError } = require("../errors");
const { Model } = require("../model/Model");

const allReports = async (req, res) => {
  const reports = await Report.find({});
  res.status(StatusCodes.OK).json({ success: true, reports: reports });
};
const createReport = async (req, res) => {
  const { report_generate_date, report_details, model } = req.body;
  if (!report_generate_date || !report_details) {
    throw new BadRequestError(
      "please provide report_generate_date, report_details"
    );
  }
  if (!model) {
    throw new BadRequestError("please provide model");
  }
  let fetchedModel;
  try {
    fetchedModel = await Model.find({ model_name: model });
  } catch (error) {
    console.log(error);
    throw new NotFoundError(`not found model ${model}`);
  }
  let new_report;
  try {
    new_report = new Report({
      report_details,
      report_generate_date,
    });
    new_report.model = fetchedModel[0];
    await new_report.save();
  } catch (error) {
    console.log(error);
    throw new BadRequestError(
      "please provide valid report_generate_date, report_details!!"
    );
  }
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, new_report: new_report });
};
const getReport = async (req, res) => {
  const report_id_ = req.params.report_id.slice(1);
  const report = await Report.findById(report_id_);
  if (!report) {
    throw new NotFoundError(`report not found with id: ${report_id_}`);
  }
  res.status(StatusCodes.OK).json({ status: true, report: report });
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
module.exports = {
  allReports,
  createReport,
  deleteReport,
  updateReport,
  getReport,
};
