const jwt = require("jsonwebtoken");
const {
  getDoctorAppointments,
  getAppointmentsCount,
  getTodayDoctorAppointments,
  getTodayAppointmentsCount,
  updateAppointmentStatus,
  addHealthcareRecord,
  getPatientRecords,
  HealthcareRecord,
  Patient,
} = require("../models/doctorAppointments");
exports.getAllAppointments = async (req, res) => {
  const doctorToken = req.cookies["Doctor Token"];

  if (!doctorToken) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(doctorToken, process.env.JWT_SECRET);
    if (decoded.userType !== "doctor") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const staffId = decoded.id;
    const appointments = await getDoctorAppointments(staffId);
    const appointmentsCount = await getAppointmentsCount(staffId);

    res.json({ appointments, appointmentsCount });
  } catch (error) {
    console.error("Error in getAllAppointments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTodayAppointments = async (req, res) => {
  const doctorToken = req.cookies["Doctor Token"];

  if (!doctorToken) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(doctorToken, process.env.JWT_SECRET);
    if (decoded.userType !== "doctor") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const staffId = decoded.id;
    const appointments = await getTodayDoctorAppointments(staffId);
    const appointmentsCount = await getTodayAppointmentsCount(staffId);

    res.json({ appointmentsCount, appointments });
  } catch (error) {
    console.error("Error in getTodayAppointments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateAppointment = async (req, res) => {
  const { appointmentId, isDone } = req.body;
  const doctorToken = req.cookies["Doctor Token"];

  if (!doctorToken) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(doctorToken, process.env.JWT_SECRET);
    if (decoded.userType !== "doctor") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedAppointment = await updateAppointmentStatus(
      appointmentId,
      isDone
    );
    res.json({ appointment: updatedAppointment });
  } catch (error) {
    console.error("Error in updateAppointment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addRecord = async (req, res) => {
  const { patientId, diagnosis, drugs, treatmentPlan } = req.body;
  const doctorToken = req.cookies["Doctor Token"];

  if (!doctorToken) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(doctorToken, process.env.JWT_SECRET);
    if (decoded.userType !== "doctor") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const staffId = decoded.id;
    const newRecord = await addHealthcareRecord(
      patientId,
      staffId,
      diagnosis,
      drugs,
      treatmentPlan
    );
    res.json({ record: newRecord });
  } catch (error) {
    console.error("Error in addRecord:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// exports.getRecords = async (req, res) => {
//   const doctorToken = req.cookies['Doctor Token'];

//   if (!doctorToken) {
//     return res.status(401).json({ message: 'Not authenticated' });
//   }

//   try {
//     const decoded = jwt.verify(doctorToken, process.env.JWT_SECRET);
//     if (decoded.userType !== 'doctor') {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     const staffId = decoded.id;
//     const records = await getPatientRecords(staffId);
//     res.json({ records });
//   } catch (error) {
//     console.error('Error in getRecords:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

exports.getRecords = async (req, res) => {
  const doctorToken = req.cookies["Doctor Token"];

  if (!doctorToken) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(doctorToken, process.env.JWT_SECRET);
    if (decoded.userType !== "doctor") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const staffId = decoded.id;
    const records = await getPatientRecords(staffId);
    res.json({ records });
  } catch (error) {
    console.error("Error in getRecords:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// exports.softDelete = async (req, res) => {
//   const recordId = req.params.id;
//   await HealthcareRecord.softDelete(recordId);
//   res.send('Record soft deleted.');
// };

// exports.updateRecord = async (req, res) => {
//   const recordId = req.params.id;
//   const updates = req.body;

//   await HealthcareRecord.updateRecord(recordId, updates);
//   res.send('Record updated.');
// };

exports.softDelete = async (req, res) => {
  const recordId = req.params.id;

  try {
    const result = await HealthcareRecord.softDelete(recordId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in softDelete:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateRecord = async (req, res) => {
  const recordId = req.params.id;
  const updates = req.body;

  try {
    const result = await HealthcareRecord.updateRecord(recordId, updates);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in updateRecord:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.patientController = {
  updatePatientInfo: async (req, res) => {
    const patientId = req.params.id;
    const updates = req.body;

    await Patient.updatePatientInfo(patientId, updates);
    res.send("Patient information updated.");
  },
};
