const { default: mongoose } = require("mongoose");

const lesionSchema = mongoose.Schema({
  lesion_type: {
    type: String,
    required: [true, "lesion_type is required"],
  },

  lesion_severity: {
    type: String,
    required: [true, "lesion_severity is required"],
  },
});
const Lesion = mongoose.model("Lesion", lesionSchema);
module.exports = { Lesion, lesionSchema };
