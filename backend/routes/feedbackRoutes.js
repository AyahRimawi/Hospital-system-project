const express = require("express");
const router = express.Router();
const {
  createFeedback,
  getFeedbacks,
  toggleFeedbackStatus,
} = require("../controller/feedbackController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.post("/", authenticateToken, createFeedback);
router.get("/", getFeedbacks);
router.patch("/admin/feedbacks/:id", toggleFeedbackStatus);

module.exports = router;
