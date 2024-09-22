import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAppointments,
  updateAppointmentStatus,
  addHealthcareRecord,
} from "../../../store/appointmentsSlice";

const AppointmentDashboard = () => {
  const dispatch = useDispatch();
  const { total, today, todayAppointments, loading, error } = useSelector(
    (state) => state.appointments
  );
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [formData, setFormData] = useState({
    diagnosis: "",
    drugs: "",
    treatmentPlan: "",
  });

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const handleToggleStatus = async (appointmentId, currentStatus) => {
    try {
      await dispatch(
        updateAppointmentStatus({ appointmentId, isDone: !currentStatus })
      ).unwrap();
      setUpdateError(null);
    } catch (error) {
      setUpdateError(`Failed to update appointment: ${error.message}`);
    }
  };

  const handleOpenForm = (appointment) => {
    console.log("Selected Appointment:", appointment); // تحقق من الكائن
    setSelectedAppointment(appointment);
  };

  const handleCloseForm = () => {
    setSelectedAppointment(null);
    setFormData({ diagnosis: "", drugs: "", treatmentPlan: "" });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({
      patientId: selectedAppointment.id,
      staffId: "STAFF_ID_HERE",
      diagnosis: formData.diagnosis,
      drugs: formData.drugs,
      treatmentPlan: formData.treatmentPlan,
    });

    dispatch(
      addHealthcareRecord({
        patientId: selectedAppointment.id, // تأكد أن هذا معرف المريض صحيح
        staffId: "STAFF_ID_HERE", // استبدله بمعرف الطبيب الصحيح
        diagnosis: formData.diagnosis,
        drugs: formData.drugs,
        treatmentPlan: formData.treatmentPlan,
      })
    );
    handleCloseForm();
  };

  //   const handleFormSubmit = (e) => {
  //     e.preventDefault();
  //     dispatch(addHealthcareRecord({
  //       patientId: selectedAppointment.id,
  //       staffId: 'STAFF_ID_HERE',
  //       ...formData
  //     }));
  //     handleCloseForm();
  //   };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg">
          <div className="text-blue-500 text-4xl mb-2">
            <span role="img" aria-label="Total Patients">
              👥
            </span>
          </div>
          <div className="text-2xl font-bold">{total}+</div>
          <div className="text-sm">Total Patients Till Today</div>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <div className="text-blue-500 text-4xl mb-2">
            <span role="img" aria-label="Today's Patients">
              🩺
            </span>
          </div>
          <div className="text-2xl font-bold">{today}</div>
          <div className="text-sm">Today's Patients</div>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <div className="text-blue-500 text-4xl mb-2">
            <span role="img" aria-label="Today's Appointments">
              🕒
            </span>
          </div>
          <div className="text-2xl font-bold">{todayAppointments.length}</div>
          <div className="text-sm">Today's Appointments</div>
        </div>
      </div>
      {updateError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {updateError}</span>
        </div>
      )}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Today's Appointments</h2>
        <ul>
          {todayAppointments.map((appointment) => (
            <li
              key={appointment.appointment_id}
              className="flex items-center justify-between py-2 border-b"
            >
              <div className="flex items-center">
                <img
                  src={appointment.patient_image || "/placeholder.png"}
                  alt={appointment.patient_name}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <div>{appointment.id}</div>
                  <div className="font-semibold">
                    {appointment.patient_name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {appointment.available_start_time}
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={() =>
                    handleToggleStatus(
                      appointment.appointment_id,
                      appointment.is_done
                    )
                  }
                  className={`px-4 py-2 rounded ${
                    appointment.is_done ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                >
                  {appointment.is_done ? "Completed" : "Pending"}
                </button>
                {appointment.is_done && (
                  <button
                    onClick={() => handleOpenForm(appointment)}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Add Record
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Healthcare Record</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Diagnosis</label>
                <input
                  type="text"
                  value={formData.diagnosis}
                  onChange={(e) =>
                    setFormData({ ...formData, diagnosis: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Drugs</label>
                <input
                  type="text"
                  value={formData.drugs}
                  onChange={(e) =>
                    setFormData({ ...formData, drugs: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Treatment Plan</label>
                <textarea
                  value={formData.treatmentPlan}
                  onChange={(e) =>
                    setFormData({ ...formData, treatmentPlan: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="mr-2 px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentDashboard;
