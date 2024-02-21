const express = require("express");
const router = express.Router();

const { getAllPatients } = require("../controllers/patient-controller");
router.route("/").get(getAllPatients);

router;
//   .route("/:report_id")
//   .get(getReport)
//   .delete(deleteReport)
//   .patch(updateReport);

module.exports = router;
