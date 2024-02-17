const { StatusCodes } = require("http-status-codes");
const Report = require("../model/Report");
const { BadRequestError, NotFoundError } = require("../errors");
const Model = require("../model/Model");

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
    throw new NotFoundError(`not found model ${model}`);
  }
  let new_report;
  try {
    new_report = await Report.create({
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

module.exports = {
  allReports,
  createReport,
};
