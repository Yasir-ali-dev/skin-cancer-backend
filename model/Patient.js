const { default: mongoose } = require("mongoose");

const patientSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minLength: [5, "please provide fullname"],
  },
  age: {
    type: Number,
    required: [true, "age is required"],
  },
  gender: {
    type: String,
    enum: ["MALE", "FEMALE"],
  },
  cancer_acquired_date: {
    type: Date,
  },
  email: {
    type: String,
    match:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    unique: [true, "Email should be unique"],
  },
  phone: {
    type: String,
    required: [true, "phone number is required"],
  },
  address: {
    type: String,
  },
  date_of_birth: {
    type: Date,
  },
});
module.exports = mongoose.model("Patient", patientSchema);
