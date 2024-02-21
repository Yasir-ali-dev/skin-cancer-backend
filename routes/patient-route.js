const express = require("express");
const router = express.Router();

const {
  getAllPatients,
  createPatient,
  getPatient,
  deletePatient,
  updatePatient,
} = require("../controllers/patient-controller");
router.route("/").get(getAllPatients).post(createPatient);

router
  .route("/:patient_id")
  .get(getPatient)
  .delete(deletePatient)
  .patch(updatePatient);

module.exports = router;
