const { default: mongoose } = require("mongoose");

const modelSchema = mongoose.Schema({
  model_name: {
    type: String,
    required: ["model_name is required"],
    enum: ["RESNET", "DL"],
  },
});
module.exports = mongoose.model("Model", modelSchema);
