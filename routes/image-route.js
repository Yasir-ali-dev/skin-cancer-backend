const express = require("express");

const router = express.Router();
const {
  getAllSkinImages,
  getSkinImage,
  createSkinImage,
} = require("../controllers/skin-image-controller");

router.route("/").get(getAllSkinImages).post(createSkinImage);

router.route("/:image_id").get(getSkinImage);
//   .delete(deleteLesion)
//   .patch(updateLesion);

module.exports = router;
