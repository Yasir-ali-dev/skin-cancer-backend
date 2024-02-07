const { StatusCodes } = require("http-status-codes");
const Model = require("../model/Model");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllModels = async (req, res) => {
  const allModels = await Model.find({});
  res.status(StatusCodes.OK).json({ status: true, all_models: allModels });
};
const createModel = async (req, res) => {
  const { model_name } = req.body;
  if (!model_name) {
    throw new BadRequestError("please provide model_name");
  }
  let newModel;
  try {
    newModel = await Model.create({ model_name });
  } catch (error) {
    throw new BadRequestError("please provide valid enum");
  }
  res.status(StatusCodes.CREATED).json({ status: true, new_model: newModel });
};
const getModel = async (req, res) => {
  const model_id = req.params.model_id.slice(1);
  let model;
  try {
    model = await Model.findById(model_id);
  } catch (error) {
    throw new NotFoundError(`model not found with id: ${model_id}`);
  }
  res.status(StatusCodes.OK).json({ status: true, model: model });
};
const deleteModel = async (req, res) => {
  const model_id = req.params.model_id.slice(1);
  let model;
  try {
    model = await Model.findByIdAndDelete(model_id);
  } catch (error) {
    throw new NotFoundError(`model not found with id: ${model_id}`);
  }
  res.status(StatusCodes.OK).json({ status: true, deleted_model: model });
};
const updateModel = async (req, res) => {
  const model_id = req.params.model_id.slice(1);
  if (!req.body.model_name) {
    throw new BadRequestError("please provide model_name");
  }
  let model;
  try {
    model = await Model.findByIdAndUpdate(model_id, req.body, { new: true });
  } catch (error) {
    throw new NotFoundError(`model not found with id: ${model_id}`);
  }
  res.status(StatusCodes.OK).json({ status: true, updated_model: model });
};

module.exports = {
  getAllModels,
  createModel,
  getModel,
  deleteModel,
  updateModel,
};
