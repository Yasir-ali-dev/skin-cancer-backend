const { default: mongoose } = require("mongoose");
const { modelSchema } = require("./Model");
const { lesionSchema } = require("./Lesion");
const { feedbackSchema } = require("./Feedback");
const reportSchema = mongoose.Schema({
  report_generate_date: {
    type: Date,
    required: [true, "report_generate_date is required!"],
  },
  report_details: {
    type: String,
    required: [true, "report_details is required!"],
    minLength: [5, "please provide report details"],
  },
  accuracy_score: {
    type: String,
    required: [true, "accuracy_score is required!"],
  },
  model: { type: modelSchema },
  lesion: { type: lesionSchema },
  feedback: { type: feedbackSchema },
});
module.exports = mongoose.model("Report", reportSchema);
