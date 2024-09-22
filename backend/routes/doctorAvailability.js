const express = require("express");
const router = express.Router();
const {
  setAvailability,
  // getAvailabilitiesWebsite,
  getDoctorAvailabilities,
  updateAvailability,
  deleteAvailability,
} = require("../controller/doctorAvailabilityController");
const { authenticateDoctor } = require("../middleware/doctorMiddleware");
//* ----------------
router.post("/set-availability", authenticateDoctor, setAvailability);
// router.get("/availabilities/:staffId",authenticateDoctor,getAvailabilitiesWebsite);
router.get("/availabilities", authenticateDoctor, getDoctorAvailabilities);
router.put(
  "/availability/:availableId",
  authenticateDoctor,
  updateAvailability
);
router.delete(
  "/availability/:availableId",
  authenticateDoctor,
  deleteAvailability
);
//* ----------------

module.exports = router;

// ---------------------------------

//?postman ...
//TODOO ...... doctorAvailability .... POST ...
//*http://localhost:5000/api/doctor/set-availability

// {
//   "availableStartDate": "2024-09-20",
//   "availableEndDate": "2024-09-25",
//   "startTime": "09:00:00",
//   "endTime": "17:00:00"
// }

// TODOO ...... getAvailability WebSite .... GET ...
// * http://localhost:5000/api/doctor/availabilities/:staffId

//TODOO ...... getAvailability Dashboard .... GET ...
//* http://localhost:5000/api/doctor/availabilities

//TODOO ...... updateAvailability .... PUT ...
//* http://localhost:5000/api/doctor/availability/{availableId}

// {
//   "availableStartDate": "2024-09-21",
//   "availableEndDate": "2024-09-26",
//   "startTime": "10:00:00",
//   "endTime": "18:00:00"
// }

//TODOO ...... deleteAvailability .... DELETE ...
//* http://localhost:5000/api/doctor/availability/{availableId}
