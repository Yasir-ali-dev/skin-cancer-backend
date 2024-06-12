const { default: mongoose } = require("mongoose");

const patientSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minLength: [5, "please provide fullname"],
  },
  age: {
    type: String,
    required: [true, "age is required"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
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
    type: String,
  },
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
});
module.exports = mongoose.model("Patient", patientSchema);
