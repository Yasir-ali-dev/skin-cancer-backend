const { default: mongoose } = require("mongoose");

const lesionSchema = mongoose.Schema({
  lesion_type: {
    type: String,
    required: [true, "lesion_type is required"],
  },
  lesion_location: {
    type: String,
    required: [true, "lesion_location is required"],
  },
  lesion_size: {
    type: String,
    required: [true, "lesion_size is required"],
  },
  lesion_color: {
    type: String,
    required: [true, "lesion_color is required"],
  },
  lesion_texture: {
    type: String,
    required: [true, "lesion_texture is required"],
  },
});
const Lesion = mongoose.model("Lesion", lesionSchema);
module.exports = { Lesion, lesionSchema };
