const express = require("express");
const router = express.Router();
const {
  allFeedbacks,
  deleteFeedback,
  getFeedback,
  createFeedback,
  updateFeedback,
} = require("../controllers/feedback-controller");

router.route("/").get(allFeedbacks).post(createFeedback);
router
  .route("/:feedback_id")
  .get(getFeedback)
  .delete(deleteFeedback)
  .patch(updateFeedback);

module.exports = router;
