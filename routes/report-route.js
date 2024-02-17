const express = require("express");
const router = express.Router();
const {
  allReports,
  createReport,
} = require("../controllers/report-controller");

router.route("/").get(allReports).post(createReport);

module.exports = router;
