const express = require("express");

const router = express.Router();
const {
  getAllLesions,
  getLesion,
  createLesion,
  deleteLesion,
} = require("../controllers/lesion-controller");

router.route("/").get(getAllLesions).post(createLesion);

router.route("/:lesion_id").get(getLesion).delete(deleteLesion);
module.exports = router;
