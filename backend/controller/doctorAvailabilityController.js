const DoctorAvailability = require("../models/doctorAvailability");

//TODOO ----------------- setAvailability ---------------------

const setAvailability = async (req, res) => {
  try {
    const { availableStartDate, availableEndDate, startTime, endTime } =
      req.body;

    const staffId = req.user.id;
    if (!staffId) {
      return res.status(400).json({ message: "Staff ID is missing" });
    }
    // ---------------------
    const hasConflict = await DoctorAvailability.checkAvailabilityConflict(
      staffId,
      availableStartDate,
      availableEndDate || availableStartDate,
      startTime,
      endTime
    );

    if (hasConflict) {
      return res
        .status(400)
        .json({ message: "Conflict with existing availability" });
    }

    const availability = await DoctorAvailability.setAvailability(
      staffId,
      availableStartDate,
      availableEndDate,
      startTime,
      endTime
    );

    res
      .status(201)
      .json({ message: "Availability set successfully", availability });
  } catch (error) {
    console.error("Error setting availability:", error);

    res
      .status(500)
      .json({ message: "Error setting availability", error: error.message });
  }
};

//TODOO ----------------- getAvailability Website ---------------------

// const getAvailabilitiesWebsite = async (req, res) => {
//   try {
//     const staffId = req.params.staffId;

//     if (!staffId) {
//       return res.status(400).json({ message: "Staff ID is missing" });
//     }

//     const availabilities = await DoctorAvailability.getAvailabilitiesWebsite(
//       staffId
//     );

//     if (availabilities.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No availabilities found for this doctor" });
//     }

//     res.status(200).json({
//       message: "Doctor availabilities retrieved successfully",
//       availabilities: availabilities,
//     });
//   } catch (error) {
//     console.error("Error getting doctor availabilities:", error);
//     res.status(500).json({
//       message: "Error getting doctor availabilities",
//       error: error.message,
//     });
//   }
// };
//TODOO ----------------- getAvailability Dashboard ---------------------

// const getDoctorAvailabilities = async (req, res) => {
//   try {
//     const staffId = req.user.id;

//     const availabilities = await DoctorAvailability.getDoctorAvailabilities(
//       staffId
//     );

//     if (availabilities.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No availabilities found for this doctor" });
//     }

//     res.status(200).json({
//       message: "Doctor availabilities retrieved successfully",
//       availabilities: availabilities,
//     });
//   } catch (error) {
//     console.error("Error getting doctor availabilities:", error);
//     res.status(500).json({
//       message: "Error getting doctor availabilities",
//       error: error.message,
//     });
//   }
// };

const getDoctorAvailabilities = async (req, res) => {
  try {
    const staffId = req.user.id;

    const availabilities = await DoctorAvailability.getDoctorAvailabilities(
      staffId
    );

    if (availabilities.length === 0) {
      return res
        .status(404)
        .json({ message: "No availabilities found for this doctor" });
    }

    res.status(200).json({
      message: "Doctor availabilities retrieved successfully",
      availabilities: availabilities,
    });
  } catch (error) {
    console.error("Error getting doctor availabilities:", error);
    res.status(500).json({
      message: "Error getting doctor availabilities",
      error: error.message,
    });
  }
};

//TODOO ----------------- updateAvailability ---------------------

const updateAvailability = async (req, res) => {
  try {
    const staffId = req.user.id;
    const availableId = req.params.availableId;
    const updatedData = req.body;

    const updatedAvailability = await DoctorAvailability.updateAvailability(
      availableId,
      staffId,
      updatedData
    );

    if (!updatedAvailability) {
      return res.status(404).json({
        message:
          "Availability not found or you don't have permission to update it",
      });
    }

    res.status(200).json({
      message: "Availability updated successfully",
      availability: updatedAvailability,
    });
  } catch (error) {
    console.error("Error updating availability:", error);
    res
      .status(500)
      .json({ message: "Error updating availability", error: error.message });
  }
};

//TODOO ----------------- deleteAvailability ---------------------
const deleteAvailability = async (req, res) => {
  try {
    const staffId = req.user.id;
    const availableId = req.params.availableId;

    const deletedAvailability = await DoctorAvailability.softDeleteAvailability(
      availableId,
      staffId
    );

    if (!deletedAvailability) {
      return res.status(404).json({
        message:
          "Availability not found or you don't have permission to delete it",
      });
    }

    res.status(200).json({
      message: "Availability soft deleted successfully",
      availability: deletedAvailability,
    });
  } catch (error) {
    console.error("Error soft deleting availability:", error);
    res.status(500).json({
      message: "Error soft deleting availability",
      error: error.message,
    });
  }
};

module.exports = {
  setAvailability,
  // getAvailabilitiesWebsite,
  getDoctorAvailabilities,
  updateAvailability,
  deleteAvailability,
};
