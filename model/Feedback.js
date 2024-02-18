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
  physician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Physician",
  },
});
module.exports = mongoose.model("Feedback", feedbackSchema);
