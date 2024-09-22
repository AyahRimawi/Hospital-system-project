const db = require("../config/db");
const getDoctorAppointments = async (staffId) => {
  const query = `
    SELECT 
      a.appointment_id, 
      da.available_start_date,
      da.available_end_date,
      da.available_start_time,
      da.available_end_time,
      p.username AS patient_name,
      p.id AS patient_id,
      a.status,
      a.is_done
    FROM 
      appointments a
    JOIN 
      doctor_availability da ON a.available_id = da.available_id
    JOIN 
      patients p ON a.id = p.id
    WHERE 
      da.staff_id = $1 
      AND a.status = 'SCHEDULED'
    ORDER BY 
      da.available_start_date, da.available_start_time
  `;

  const { rows } = await db.query(query, [staffId]);
  return rows;
};

const getAppointmentsCount = async (staffId) => {
  const query = `
    SELECT COUNT(*) 
    FROM appointments a
    JOIN doctor_availability da ON a.available_id = da.available_id
    WHERE da.staff_id = $1 AND a.status = 'SCHEDULED'
  `;

  const { rows } = await db.query(query, [staffId]);
  return parseInt(rows[0].count);
};

const getTodayDoctorAppointments = async (staffId) => {
  const query = `
    SELECT 
      a.appointment_id, 
      da.available_start_time,
      da.available_end_time,
      p.username AS patient_name,
      p.id AS patient_id,
      a.status,
      a.is_done
    FROM 
      appointments a
    JOIN 
      doctor_availability da ON a.available_id = da.available_id
    JOIN 
      patients p ON a.id = p.id
    WHERE 
      da.staff_id = $1 
      AND a.status = 'SCHEDULED'
      AND da.available_start_date <= CURRENT_DATE
      AND (da.available_end_date IS NULL OR da.available_end_date >= CURRENT_DATE)
    ORDER BY 
      da.available_start_time
  `;

  const { rows } = await db.query(query, [staffId]);
  return rows;
};
const getTodayAppointmentsCount = async (staffId) => {
  const query = `
    SELECT COUNT(*) 
    FROM appointments a
    JOIN doctor_availability da ON a.available_id = da.available_id
    WHERE da.staff_id = $1 AND a.status = 'SCHEDULED'
     AND da.available_start_date <= CURRENT_DATE
      AND (da.available_end_date IS NULL OR da.available_end_date >= CURRENT_DATE)
  `;

  const { rows } = await db.query(query, [staffId]);
  return parseInt(rows[0].count);
};

const updateAppointmentStatus = async (appointmentId, isDone) => {
  // const query = `
  //   UPDATE appointments
  //   SET is_done = $1, status = CASE WHEN $1 THEN 'COMPLETED' ELSE 'SCHEDULED' END
  //   WHERE appointment_id = $2
  //   RETURNING *
  // `;
  const query = `
  UPDATE appointments
  SET is_done = $1, status = CASE WHEN $1 THEN 'COMPLETED'::appointment_status_enum ELSE 'SCHEDULED'::appointment_status_enum END
  WHERE appointment_id = $2
  RETURNING *
`;

  const { rows } = await db.query(query, [isDone, appointmentId]);
  return rows[0];
};

// const addHealthcareRecord = async (patientId, staffId, diagnosis, drugs, treatmentPlan) => {
//   const query = `
//     INSERT INTO healthcare_records (id, staff_id, diagnosis, drugs, treatment_plan)
//     VALUES ($1, $2, $3, $4, $5)
//     RETURNING *
//   `;

//   const { rows } = await db.query(query, [patientId, staffId, diagnosis, drugs, treatmentPlan]);
//   return rows[0];
// };
const addHealthcareRecord = async (
  patientId,
  staffId,
  diagnosis,
  drugs,
  treatmentPlan
) => {
  const query = `
    INSERT INTO healthcare_records (id, staff_id, diagnosis, drugs, treatment_plan)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const { rows } = await db.query(query, [
    patientId,
    staffId,
    diagnosis,
    drugs,
    treatmentPlan,
  ]);
  return rows[0];
};

// const getPatientRecords = async () => {
//   const query = `
//     SELECT p.*, hr.*
//     FROM patients p
//     LEFT JOIN healthcare_records hr ON p.id = hr.id
//     WHERE hr.is_deleted = FALSE
//     ORDER BY p.id, hr.record_id
//   `;

//   const { rows } = await db.query(query);
//   return rows;
// };

const getPatientRecords = async (staffId) => {
  const query = `
    SELECT DISTINCT ON (p.id) p.*, hr.* 
    FROM patients p
    JOIN appointments a ON p.id = a.id
    LEFT JOIN healthcare_records hr ON p.id = hr.id
    WHERE a.status = 'COMPLETED' AND a.is_done = TRUE
    AND EXISTS (
      SELECT 1 FROM doctor_availability da 
      WHERE da.available_id = a.available_id AND da.staff_id = $1
    )
    AND (hr.is_deleted = FALSE OR hr.is_deleted IS NULL)
    ORDER BY p.id, hr.created_at DESC
  `;

  const { rows } = await db.query(query, [staffId]);
  return rows;
};
// const HealthcareRecord = {
//   softDelete: async (recordId) => {
//       return await db.query('UPDATE healthcare_records SET is_deleted = TRUE WHERE record_id = $1', [recordId]);
//   },
//   updateRecord: async (recordId, updates) => {
//       const { diagnosis, drugs, treatment_plan } = updates;
//       return await db.query(`
//           UPDATE healthcare_records
//           SET diagnosis = $1, drugs = $2, treatment_plan = $3
//           WHERE record_id = $4 AND is_deleted = FALSE`,
//           [diagnosis, drugs, treatment_plan, recordId]);
//   }
// };

const HealthcareRecord = {
  softDelete: async (recordId) => {
    try {
      await db.query(
        "UPDATE healthcare_records SET is_deleted = TRUE WHERE record_id = $1",
        [recordId]
      );
      return { message: "Record soft deleted successfully." };
    } catch (error) {
      console.error("Error in softDelete:", error);
      throw new Error("Error deleting the record.");
    }
  },

  updateRecord: async (recordId, updates) => {
    const { diagnosis, drugs, treatment_plan } = updates;

    try {
      const result = await db.query(
        `
          UPDATE healthcare_records
          SET diagnosis = $1, drugs = $2, treatment_plan = $3
          WHERE record_id = $4 AND is_deleted = FALSE`,
        [diagnosis, drugs, treatment_plan, recordId]
      );

      if (result.rowCount === 0) {
        throw new Error("No record found or record is deleted.");
      }

      return { message: "Record updated successfully." };
    } catch (error) {
      console.error("Error in updateRecord:", error);
      throw new Error("Error updating the record.");
    }
  },
};

// SELECT
//   hr.record_id,
//   p.username AS patient_name,
//   hr.diagnosis,
//   hr.drugs,
//   hr.treatment_plan
// FROM
//   healthcare_records hr
// JOIN
//   patients p ON hr.id = p.id
// WHERE
//   hr.staff_id = $1
// ORDER BY
//   hr.record_id DESC

const Patient = {
  updatePatientInfo: async (patientId, updates) => {
    const { chronic_diseases, blood_type, haveallergy } = updates;
    return await db.query(
      `
              UPDATE patients
              SET chronic_diseases = $1, blood_type = $2, haveallergy = $3
              WHERE id = $4`,
      [chronic_diseases, blood_type, haveallergy, patientId]
    );
  },
};

module.exports = {
  getDoctorAppointments,
  getAppointmentsCount,
  getTodayDoctorAppointments,
  getTodayAppointmentsCount,
  updateAppointmentStatus,
  addHealthcareRecord,
  getPatientRecords,
  HealthcareRecord,
  Patient,
};
