const { default: mongoose } = require("mongoose");

const physicianSchema = mongoose.Schema({
  name: {
    type: String,
    requied: [true, "physician_name is required"],
    minLength: [5, "please enter fullname"],
  },
  facility_center: {
    type: String,
    requied: [true, "facility_center is required"],
  },
  specialization: {
    type: String,
    requied: [true, "specialization is required"],
  },
});

module.exports = mongoose.model("Physician", physicianSchema);
