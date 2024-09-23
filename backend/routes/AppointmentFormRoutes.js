
// // admin-appointmentRoutes.js
// const express = require('express');
// const router = express.Router();
// const appointmentController = require('../controller/AppointmentFormController');

// // Apply authentication middleware to all routes
// router.use(appointmentController.authenticateToken);

// router.get('/doctors/:doctorId/available-slots', appointmentController.getAvailableSlots);
// router.post('/appointments', appointmentController.bookAppointment);

// module.exports = router;


const express = require("express");
const router = express.Router();
const appointmentController = require("../controller/AppointmentFormController");
const {
  getDoctorByAppointmentId,
} = require("../controller/AppointmentFormController");

// Routes that require authentication
router.get(
  "/doctors/:doctorId/available-slots",
  appointmentController.authenticateToken,
  appointmentController.getAvailableSlots
);
router.post(
  "/appointments",
  appointmentController.authenticateToken,
  appointmentController.bookAppointment
);
router.post(
  "/submit-review",
  appointmentController.authenticateToken,
  appointmentController.submitReview
);
router.get(
  "/unreviewed-appointments",
  appointmentController.authenticateToken,
  appointmentController.getUnreviewedAppointments
);

// Route that doesn't require authentication
router.get("/doctor/:id", getDoctorByAppointmentId);

module.exports = router;