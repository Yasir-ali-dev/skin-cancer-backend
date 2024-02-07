const express = require("express");
const {
  getAllModels,
  createModel,
  getModel,
  updateModel,
  deleteModel,
} = require("../controllers/model-controller");
const router = express.Router();

router.route("/").get(getAllModels).post(createModel);
router.route("/:model_id").get(getModel).delete(deleteModel).patch(updateModel);

module.exports = router;
