const router = require("express").Router();
const {
  updateReview,
  deleteReview,
  getReviews,
  replyReview,
  createReview,
} = require("../controllers/reviewController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/create-review", verifyToken, createReview);
router.put("/update-review", verifyToken, updateReview);
router.delete("/delete-review", verifyToken, deleteReview);
router.get("/get-reviews/id", getReviews);
router.put("/reply-reviews/id", verifyToken, replyReview);

module.exports = router;
