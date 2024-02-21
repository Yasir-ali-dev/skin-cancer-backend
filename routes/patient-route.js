const express = require("express");
const router = express.Router();

const {
  getAllPatients,
  createPatient,
} = require("../controllers/patient-controller");
router.route("/").get(getAllPatients).post(createPatient);

router;
//   .route("/:report_id")
//   .get(getReport)
//   .delete(deleteReport)
//   .patch(updateReport);

module.exports = router;
