const db = require("../config/db");

exports.createFeedback = async (req, res) => {
  const { content, rating } = req.body;
  const userId = req.user.id;
  console.log(userId);

  try {
    const query =
      "INSERT INTO feedback (id, content, rating) VALUES ($1, $2, $3) RETURNING *";
    const values = [userId, content, rating];
    const result = await db.query(query, values);

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback: result.rows[0],
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res
      .status(500)
      .json({ success: false, message: "Error submitting feedback" });
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const query = `
        SELECT f.*, p.username 
        FROM feedback f 
        JOIN patients p ON f.id = p.id 
        WHERE f.is_deleted = false 
        ORDER BY f.created_at DESC
      `;
    const result = await db.query(query);

    res.status(200).json({
      success: true,
      feedbacks: result.rows,
    });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching feedbacks" });
  }
};

exports.toggleFeedbackStatus = async (req, res) => {
  const { id } = req.params;
  const { is_deleted } = req.body;

  try {
    const query =
      "UPDATE feedback SET is_deleted = $1 WHERE id = $2 RETURNING *";
    const result = await db.query(query, [is_deleted, id]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "الملاحظة غير موجودة" });
    }

    res.status(200).json({
      success: true,
      message: "تم تحديث حالة الملاحظة بنجاح",
      feedback: result.rows[0],
    });
  } catch (error) {
    console.error("خطأ في تحديث حالة الملاحظة:", error);
    res
      .status(500)
      .json({ success: false, message: "حدث خطأ أثناء تحديث حالة الملاحظة" });
  }
};
