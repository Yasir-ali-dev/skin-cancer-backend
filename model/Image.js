const { default: mongoose } = require("mongoose");
const { lesionSchema } = require("../model/Lesion");
const imageSchema = mongoose.Schema({
  image_url: {
    type: String,
    required: [true, "image_url is required"],
  },
  image_source: {
    type: String,
    required: [true, "image_source is required"],
  },
  captured_date: {
    type: String,
    required: [true, "captured_date is required"],
  },
  report: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Report",
  },
});
module.exports = mongoose.model("Image", imageSchema);
