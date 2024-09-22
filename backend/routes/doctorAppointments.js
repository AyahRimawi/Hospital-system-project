const express = require("express");
const router = express.Router();
const {
  getAllAppointments,
  getTodayAppointments,
  updateAppointment,
  addRecord,
  getRecords,
  softDelete,
  updateRecord,
  patientController,
} = require("../controller/doctorAppointments");

router.patch("/healthcare_records/:id/softdelete", softDelete);
router.patch("/healthcare_records/:id/update", updateRecord);
router.get("/appointments", getAllAppointments);
router.get("/today-appointments", getTodayAppointments);
router.put("/update-appointment", updateAppointment);
router.post("/add-record", addRecord);
router.get("/patient-records", getRecords);
router.patch("/patients/:id/update", patientController.updatePatientInfo);

module.exports = router;
