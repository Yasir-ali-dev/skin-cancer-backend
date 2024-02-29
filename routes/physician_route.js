const express = require("express");
const router = express.Router();
const {
  getAllPhysicians,
  createPhysician,
  getPhysician,
} = require("../controllers/physician-controller");

router.route("/").get(getAllPhysicians).post(createPhysician);

router.route("/:physician_id").get(getPhysician);
//   .delete(deletePatient)
//   .patch(updatePatient);

module.exports = router;
