const express = require("express");
const router = express.Router();
const doctorController = require("../controller/DoctorCommentController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.post(
  "/doctors/comments",
  authenticateToken,
  doctorController.addComment
);
router.get(
  "/doctors/:doctor_id/comments",
  doctorController.getCommentsByDoctor
);
router.put(
  "/doctors/comments/:comment_id",
  authenticateToken,
  doctorController.updateComment
);
router.delete(
  "/doctors/comments/:comment_id",
  authenticateToken,
  doctorController.deleteComment
);
// New routes for notifications
router.get(
  "/notifications",
  authenticateToken,
  doctorController.getNotifications
);
router.put(
  "/notifications/:notification_id/read",
  authenticateToken,
  doctorController.markNotificationAsRead
);

module.exports = router;
