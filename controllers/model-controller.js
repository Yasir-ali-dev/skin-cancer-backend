const { StatusCodes } = require("http-status-codes");
const { Model } = require("../model/Model");
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
  const exist = await Model.find({ model_name: model_name });
  if (exist) {
    throw new BadRequestError("model already exist");
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
  const model = await Model.findById(model_id);
  if (!model) {
    throw new NotFoundError(`model not found with id: ${model_id}`);
  }
  res.status(StatusCodes.OK).json({ status: true, model: model });
};
const deleteModel = async (req, res) => {
  const model_id = req.params.model_id.slice(1);
  const model = await Model.findByIdAndDelete(model_id);
  if (!model) {
    throw new NotFoundError(`model not found with id: ${model_id}`);
  }
  res.status(StatusCodes.OK).json({ status: true, deleted_model: model });
};
const updateModel = async (req, res) => {
  const model_id = req.params.model_id.slice(1);
  if (!req.body.model_name) {
    throw new BadRequestError("please provide model_name");
  }
  const model = await Model.findByIdAndUpdate(model_id, req.body, {
    new: true,
  });
  if (!model) {
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
