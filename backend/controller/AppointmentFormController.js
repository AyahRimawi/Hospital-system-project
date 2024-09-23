

// // admin-appointmentController.js
// const db = require('../config/db');
// const jwt = require('jsonwebtoken');

// exports.authenticateToken = (req, res, next) => {
//   const token = req.cookies['Patient Token'];

//   if (!token) {
//     return res.status(401).json({ message: 'Authentication required' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: 'Invalid or expired token' });
//   }
// };

// exports.getAvailableSlots = async (req, res) => {
//   const { doctorId } = req.params;
//   try {
//     const result = await db.query(
//       'SELECT * FROM doctor_availability WHERE staff_id = $1 AND is_booked = FALSE AND available_start_date >= CURRENT_DATE ORDER BY available_start_date, available_start_time',
//       [doctorId]
//     );
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching available slots:', error);
//     res.status(500).json({ error: 'An error occurred while fetching available slots' });
//   }
// };

// exports.bookAppointment = async (req, res) => {
//   const { available_id } = req.body;
//   const patientId = req.user.id; // Get patient ID from the token

//   try {
//     await db.query('BEGIN');
    
//     // Check if the slot is still available
//     const slotCheck = await db.query(
//       'SELECT * FROM doctor_availability WHERE available_id = $1 AND is_booked = FALSE',
//       [available_id]
//     );
    
//     if (slotCheck.rows.length === 0) {
//       await db.query('ROLLBACK');
//       return res.status(400).json({ message: 'This slot is no longer available' });
//     }
    
//     // Book the appointment
//     const result = await db.query(
//       'INSERT INTO appointments (available_id, id, status) VALUES ($1, $2, $3) RETURNING appointment_id',
//       [available_id, patientId, 'SCHEDULED']
//     );
    
//     // Mark the slot as booked
//     await db.query(
//       'UPDATE doctor_availability SET is_booked = TRUE WHERE available_id = $1',
//       [available_id]
//     );
    
//     await db.query('COMMIT');
    
//     res.status(201).json({ appointment_id: result.rows[0].appointment_id, message: 'Appointment booked successfully' });
//   } catch (error) {
//     await db.query('ROLLBACK');
//     console.error('Error booking appointment:', error);
//     res.status(500).json({ error: 'An error occurred while booking the appointment' });
//   }
// };




const db = require("../config/db");
const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  const token = req.cookies["Patient Token"];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

exports.getAvailableSlots = async (req, res) => {
  const { doctorId } = req.params;
  try {
    const result = await db.query(
      "SELECT * FROM doctor_availability WHERE staff_id = $1 AND is_booked = FALSE AND available_start_date >= CURRENT_DATE ORDER BY available_start_date, available_start_time",
      [doctorId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching available slots" });
  }
};

exports.bookAppointment = async (req, res) => {
  const { available_id } = req.body;
  const patientId = req.user.id; // Get patient ID from the token

  try {
    await db.query("BEGIN");

    // Check if the slot is still available
    const slotCheck = await db.query(
      "SELECT * FROM doctor_availability WHERE available_id = $1 AND is_booked = FALSE",
      [available_id]
    );

    if (slotCheck.rows.length === 0) {
      await db.query("ROLLBACK");
      return res
        .status(400)
        .json({ message: "This slot is no longer available" });
    }

    // Book the appointment
    const result = await db.query(
      "INSERT INTO appointments (available_id, id, status) VALUES ($1, $2, $3) RETURNING appointment_id",
      [available_id, patientId, "SCHEDULED"]
    );

    // Mark the slot as booked
    await db.query(
      "UPDATE doctor_availability SET is_booked = TRUE WHERE available_id = $1",
      [available_id]
    );

    await db.query("COMMIT");

    res
      .status(201)
      .json({
        appointment_id: result.rows[0].appointment_id,
        message: "Appointment booked successfully",
      });
  } catch (error) {
    await db.query("ROLLBACK");
    console.error("Error booking appointment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while booking the appointment" });
  }
};

exports.getUnreviewedAppointments = async (req, res) => {
  const patientId = req.user.id; // Get patient ID from the token

  try {
    const query = `
      SELECT a.appointment_id, da.staff_id AS doctor_id, da.available_start_date, da.available_start_time
      FROM appointments a
      JOIN doctor_availability da ON a.available_id = da.available_id
      WHERE a.id = $1 AND a.is_Deleted = FALSE AND a.is_Done = TRUE
      AND NOT EXISTS (
          SELECT 1
          FROM reviews r
          WHERE r.appointment_id = a.appointment_id
      )
    `;
    const result = await db.query(query, [patientId]);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching unreviewed appointments:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while fetching unreviewed appointments.",
      });
  }
};

exports.submitReview = async (req, res) => {
  const { rating, reviewContent, appointment_id } = req.body;
  const patientId = req.user.id;

  try {
    // 1. Check for completed appointments
    const appointmentQuery = `
      SELECT a.appointment_id, da.staff_id AS doctor_id
      FROM appointments a
      JOIN doctor_availability da ON a.available_id = da.available_id
      WHERE a.id = $1 AND a.is_Deleted = FALSE AND a.is_Done = TRUE
    `;

    const completedAppointments = await db.query(appointmentQuery, [patientId]);

    if (completedAppointments.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No completed appointments found." });
    }

    // 2. Check if the specified appointment has an existing review
    const reviewCheckQuery = `
      SELECT *
      FROM reviews
      WHERE appointment_id = $1 AND patient_id = $2
    `;

    const existingReview = await db.query(reviewCheckQuery, [
      appointment_id,
      patientId,
    ]);

    if (existingReview.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Review already submitted for this appointment." });
    }

    // 3. Submit the review for the specified appointment
    const doctorId = completedAppointments.rows.find(
      (appointment) => appointment.appointment_id === appointment_id
    )?.doctor_id;

    if (!doctorId) {
      return res
        .status(404)
        .json({ message: "Appointment not found or not completed." });
    }

    const insertReviewQuery = `
      INSERT INTO reviews (appointment_id, patient_id, staff_id, rating, review_content)
      VALUES ($1, $2, $3, $4, $5)
    `;

    await db.query(insertReviewQuery, [
      appointment_id,
      patientId,
      doctorId,
      rating,
      reviewContent,
    ]);
    return res.status(201).json({ message: "Review submitted successfully." });
  } catch (error) {
    console.error("Error submitting review:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting the review." });
  }
};

exports.getDoctorByAppointmentId = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const query = `
SELECT ms.staff_name
FROM appointments a
JOIN doctor_availability da ON a.available_id = da.available_id
JOIN medical_staff ms ON da.staff_id = ms.staff_id
WHERE a.appointment_id = $1`;

    const result = await db.query(query, [appointmentId]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Appointment or doctor not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching doctor by appointment ID:", error);
    res
      .status(500)
      .json({
        message: "Error fetching doctor information",
        error: error.message,
      });
  }
};
