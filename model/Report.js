const { default: mongoose } = require("mongoose");

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
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Model",
  },
});

module.exports = mongoose.model("Report", reportSchema);
