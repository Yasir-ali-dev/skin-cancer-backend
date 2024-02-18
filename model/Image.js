const { default: mongoose } = require("mongoose");
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
});
module.exports = mongoose.model("Image", imageSchema);
