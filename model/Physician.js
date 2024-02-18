const { default: mongoose } = require("mongoose");

const physicianSchema = mongoose.Schema({});
module.exports = mongoose.model("Physician", physicianSchema);
