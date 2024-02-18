const express = require("express");

const router = express.Router();
const {
  getAllLesions,
  getLesion,
  createLesion,
  deleteLesion,
  updateLesion,
} = require("../controllers/lesion-controller");

router.route("/").get(getAllLesions).post(createLesion);

router
  .route("/:lesion_id")
  .get(getLesion)
  .delete(deleteLesion)
  .patch(updateLesion);
module.exports = router;
