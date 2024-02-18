const express = require("express");

const router = express.Router();
const { getAllLesions } = require("../controllers/lesion-controller");

router.route("/").get(getAllLesions);
// router.route("/:model_id").get(getModel).delete(deleteModel).patch(updateModel);

module.exports = router;
