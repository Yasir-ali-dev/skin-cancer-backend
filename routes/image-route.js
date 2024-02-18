const express = require("express");

const router = express.Router();
const { getAllSkinImages } = require("../controllers/skin-image-controller");

router.route("/").get(getAllSkinImages);

// router
//   .route("/:lesion_id")
//   .get(getLesion)
//   .delete(deleteLesion)
//   .patch(updateLesion);

module.exports = router;
