const db = require("../config/db");

///////////
exports.addComment = async (req, res) => {
  const { doctor_id, parent_comment_id, comment_text } = req.body;
  const patient_id = req.user.id;
  try {
    // Check if the parent comment is a top-level comment
    if (parent_comment_id) {
      const parentCommentResult = await db.query(
        "SELECT parent_comment_id, patient_id FROM doctor_comments WHERE comment_id = $1",
        [parent_comment_id]
      );
      if (parentCommentResult.rows[0].parent_comment_id !== null) {
        return res.status(400).json({ error: "Cannot reply to a reply" });
      }

      const commenterResult = await db.query(
        "SELECT username FROM patients WHERE id = $1",
        [patient_id]
      );

      const commenterName = commenterResult.rows[0].username;
      // Create a notification for the parent comment author
      if (parentCommentResult.rows[0].patient_id !== patient_id) {
        await db.query(
          "INSERT INTO notifications (user_id, message, doctor_id, comment_id) VALUES ($1, $2, $3, $4)",
          [
            parentCommentResult.rows[0].patient_id,
            `${commenterName} replied to your comment`,

            doctor_id,
            parent_comment_id,
          ]
        );
      }
    }

    const result = await db.query(
      "INSERT INTO doctor_comments (doctor_id, patient_id, parent_comment_id, comment_text) VALUES ($1, $2, $3, $4) RETURNING *",
      [doctor_id, patient_id, parent_comment_id, comment_text]
    );
    const newComment = result.rows[0];

    // Fetch the username and profile image of the patient who made the comment
    const patientResult = await db.query(
      "SELECT username, profile_image FROM patients WHERE id = $1",
      [patient_id]
    );
    newComment.username = patientResult.rows[0].username;
    newComment.profile_image = patientResult.rows[0].profile_image;

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the comment" });
  }
};

/////////////////////////////////////////////////////////////
exports.getCommentsByDoctor = async (req, res) => {
  const { doctor_id } = req.params;
  try {
    if (!doctor_id) {
      return res.status(400).json({ error: "Doctor ID is required" });
    }

    const result = await db.query(
      `WITH RECURSIVE comment_tree AS (
            SELECT dc.*, p.username, p.profile_image, 0 AS level
            FROM doctor_comments dc
            JOIN patients p ON dc.patient_id = p.id
            WHERE dc.doctor_id = $1 AND dc.parent_comment_id IS NULL

            UNION ALL

            SELECT dc.*, p.username, p.profile_image, ct.level + 1 AS level
            FROM doctor_comments dc
            JOIN patients p ON dc.patient_id = p.id
            JOIN comment_tree ct ON dc.parent_comment_id = ct.comment_id
          )
          SELECT * FROM comment_tree
          ORDER BY CASE WHEN parent_comment_id IS NULL THEN comment_id ELSE parent_comment_id END, level, created_at DESC`,
      [doctor_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching comments" });
  }
};

exports.updateComment = async (req, res) => {
  const { comment_id } = req.params;
  const { comment_text } = req.body;
  const patient_id = req.user.id;
  try {
    const result = await db.query(
      "UPDATE doctor_comments SET comment_text = $1 WHERE comment_id = $2 AND patient_id = $3 RETURNING *",
      [comment_text, comment_id, patient_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Comment not found or you do not have permission to edit it",
      });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating comment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the comment" });
  }
};

exports.deleteComment = async (req, res) => {
  const { comment_id } = req.params;
  const patient_id = req.user.id;
  try {
    const result = await db.query(
      "DELETE FROM doctor_comments WHERE comment_id = $1 AND patient_id = $2 RETURNING *",
      [comment_id, patient_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Comment not found or you do not have permission to delete it",
      });
    }
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the comment" });
  }
};
//////
exports.getNotifications = async (req, res) => {
  const user_id = req.user.id;
  try {
    const result = await db.query(
      "SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching notifications" });
  }
};

exports.markNotificationAsRead = async (req, res) => {
  const { notification_id } = req.params;
  const user_id = req.user.id;
  try {
    const result = await db.query(
      "UPDATE notifications SET read = true WHERE id = $1 AND user_id = $2 RETURNING *",
      [notification_id, user_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        error:
          "Notification not found or you do not have permission to mark it as read",
      });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({
      error: "An error occurred while marking the notification as read",
    });
  }
};
