const express = require("express");
const router = express.Router();
const {
  getAllPhysicians,
  createPhysician,
  getPhysician,
  deletePhysician,
  updatePhysician,
} = require("../controllers/physician-controller");

router.route("/").get(getAllPhysicians).post(createPhysician);

router
  .route("/:physician_id")
  .get(getPhysician)
  .delete(deletePhysician)
  .patch(updatePhysician);

module.exports = router;
