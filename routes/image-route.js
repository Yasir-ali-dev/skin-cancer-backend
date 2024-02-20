const express = require("express");

const router = express.Router();
const {
  getAllSkinImages,
  getSkinImage,

  createSkinImage,
  deleteImage,
  updateSkinImage,
} = require("../controllers/skin-image-controller");

router.route("/").get(getAllSkinImages).post(createSkinImage);

router
  .route("/:image_id")
  .get(getSkinImage)
  .delete(deleteImage)
  .patch(updateSkinImage);

module.exports = router;
