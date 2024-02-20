const express = require("express");

const router = express.Router();
const {
  getAllSkinImages,
  createSkinImage,
} = require("../controllers/skin-image-controller");

router.route("/").get(getAllSkinImages).post(createSkinImage);

// router
//   .route("/:lesion_id")
//   .get(getLesion)
//   .delete(deleteLesion)
//   .patch(updateLesion);

module.exports = router;
