const { default: mongoose } = require("mongoose");

const feedbackSchema = mongoose.Schema({
  feedback_type: {
    type: String,
    enum: ["+ve", "-ve"],
    required: [true, "feedback_type is required"],
  },
  feedback_details: {
    type: String,
    required: [true, "feedback_detail is required"],
    minLength: [
      5,
      "please provide description of feedback, more than one word",
    ],
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
const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = { feedbackSchema, Feedback };
