const { default: mongoose, model } = require("mongoose");

const modelSchema = mongoose.Schema({
  model_name: {
    type: String,
    required: ["model_name is required"],
    enum: ["RESNET", "DL"],
  },
});
const Model = mongoose.model("Model", modelSchema);
module.exports = { Model, modelSchema };
