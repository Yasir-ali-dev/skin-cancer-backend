const express = require("express");
const router = express.Router();
const {
  allReports,
  createReport,
  getReport,
  deleteReport,
} = require("../controllers/report-controller");

router.route("/").get(allReports).post(createReport);
router.route("/:report_id").get(getReport).delete(deleteReport);

module.exports = router;
