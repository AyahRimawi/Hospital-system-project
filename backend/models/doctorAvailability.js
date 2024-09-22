const db = require("../config/db");

const DoctorAvailability = {
  //TODOO --------------- setAvailability ---------------

  setAvailability: async (
    staffId,
    availableStartDate,
    availableEndDate,
    startTime,
    endTime
  ) => {
    const query = `
      INSERT INTO doctor_availability
      (staff_id, available_start_date, available_end_date, available_start_time, available_end_time)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [
      staffId,
      availableStartDate,
      availableEndDate,
      startTime,
      endTime,
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  },
  //TODOO --------------------- checkAvailabilityConflict ---------------------------
  checkAvailabilityConflict: async (
    staffId,
    startDate,
    endDate,
    startTime,
    endTime
  ) => {
    const query = `
      SELECT COUNT(*) as count FROM doctor_availability
      WHERE staff_id = $1
      AND available_start_date <= $3
      AND (available_end_date IS NULL OR available_end_date >= $2)
      AND available_start_time < $5
      AND available_end_time > $4
    `;
    const values = [staffId, startDate, endDate, startTime, endTime];
    const result = await db.query(query, values);
    return parseInt(result.rows[0].count) > 0;
  },
  //TODOO --------------- getAvailability Website ---------------

  //   getAvailabilitiesWebsite: async (staffId) => {
  //     const query = `
  //     SELECT
  //         ms.staff_name,
  //         da.available_start_date,
  //         da.available_end_date,
  //         da.available_start_time,
  //         da.available_end_time
  //     FROM
  //         doctor_availability da
  //     JOIN
  //         medical_staff ms ON da.staff_id = ms.staff_id
  //     WHERE
  //         da.staff_id = $1 AND da.is_booked = FALSE
  //     ORDER BY
  //         da.available_start_date, da.available_start_time
  // `;

  //     const values = [staffId];
  //     const result = await db.query(query, values);
  //     return result.rows;
  //   },

  //TODOO --------------- getAvailability Dashboard ---------------

  //   getDoctorAvailabilities: async (staffId) => {
  //     const query = `
  //     SELECT
  //         da.available_id,
  //         ms.staff_name,
  //         da.available_start_date,
  //         da.available_end_date,
  //         da.available_start_time,
  //         da.available_end_time
  //     FROM
  //         doctor_availability da
  //     JOIN
  //         medical_staff ms ON da.staff_id = ms.staff_id
  //     WHERE
  //         da.staff_id = $1 AND da.is_booked = FALSE
  //     ORDER BY
  //         da.available_start_date, da.available_start_time
  // `;

  //     const values = [staffId];
  //     const result = await db.query(query, values);
  //     return result.rows;
  //   },

  getDoctorAvailabilities: async (staffId) => {
    const query = `
    SELECT 
        da.available_id,
        ms.staff_name,
        da.available_start_date,
        da.available_end_date,
        da.available_start_time,
        da.available_end_time
    FROM 
        doctor_availability da
    JOIN 
        medical_staff ms ON da.staff_id = ms.staff_id
    WHERE 
        da.staff_id = $1 AND da.is_booked = FALSE AND da.is_deleted = FALSE
    ORDER BY 
        da.available_start_date, da.available_start_time
  `;

    const values = [staffId];
    const result = await db.query(query, values);
    return result.rows;
  },

  //TODOO ----------------- updateAvailability ---------------------

  updateAvailability: async (availableId, staffId, updatedData) => {
    const { availableStartDate, availableEndDate, startTime, endTime } =
      updatedData;

    const query = `
    UPDATE doctor_availability
    SET 
      available_start_date = $1,
      available_end_date = $2,
      available_start_time = $3,
      available_end_time = $4
    WHERE 
      available_id = $5 AND staff_id = $6 AND is_deleted = FALSE
    RETURNING *
  `;

    const values = [
      availableStartDate,
      availableEndDate,
      startTime,
      endTime,
      availableId,
      staffId,
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  },
  //TODOO ----------------- softDeleteAvailability ---------------------

  softDeleteAvailability: async (availableId, staffId) => {
    const query = `
      UPDATE doctor_availability
      SET is_deleted = TRUE
      WHERE available_id = $1 AND staff_id = $2 AND is_deleted = FALSE
      RETURNING *
    `;

    const values = [availableId, staffId];
    const result = await db.query(query, values);
    return result.rows[0];
  },
};

module.exports = DoctorAvailability;
