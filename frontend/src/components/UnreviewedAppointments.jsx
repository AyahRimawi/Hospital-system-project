import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnreviewedAppointments } from "../store/MappointmentsSlice";
import ReviewPopup from "./ReviewPopup";
import { Calendar, Clock, User, ChevronRight, ChevronLeft } from "lucide-react";
import axios from "axios";

const UnreviewedAppointments = () => {
  const dispatch = useDispatch();
  const { appointments, status } = useSelector((state) => state.Mappointments);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [doctors, setDoctors] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    dispatch(fetchUnreviewedAppointments());
  }, [dispatch]);

  useEffect(() => {
    const fetchDoctorNames = async () => {
      const doctorNames = {};
      for (const appointment of appointments) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/appointment/doctor/${appointment.appointment_id}`
          );
          doctorNames[appointment.appointment_id] = response.data.staff_name;
        } catch (error) {
          console.error("Error fetching doctor name:", error);
        }
      }
      setDoctors(doctorNames);
    };

    if (appointments.length > 0) {
      fetchDoctorNames();
    }
  }, [appointments]);

  const handleReviewClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsPopupOpen(true);
  };

  const handlePrev = () => {
    if (!animating && appointments.length > 1) {
      setDirection(-1);
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : appointments.length - 1
        );
        setAnimating(false);
      }, 300);
    }
  };

  const handleNext = () => {
    if (!animating && appointments.length > 1) {
      setDirection(1);
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex < appointments.length - 1 ? prevIndex + 1 : 0
        );
        setAnimating(false);
      }, 300);
    }
  };

  if (status === "succeeded" && appointments.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden font-serif mt-10">
      <div className="bg-[#05464e] p-3">
        <h2 className="text-xl font-bold text-white">
          Unreviewed Appointments
        </h2>
      </div>
      <div className="p-6">
        {status === "loading" && (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#05464e]"></div>
          </div>
        )}

        {status === "succeeded" && appointments.length > 0 && (
          <div className="relative overflow-hidden">
            <div
              className={`transition-transform duration-300 ease-in-out transform ${
                animating
                  ? direction > 0
                    ? "-translate-x-full"
                    : "translate-x-full"
                  : "translate-x-0"
              }`}
            >
              <div className="bg-[#e6f0f5] rounded-lg p-6 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                  <div className="space-y-2 mb-4 md:mb-0">
                    <div className="flex items-center text-lg text-[#05464e]">
                      <Calendar className="w-5 h-5 mr-2 text-[#05464e]" />
                      <span className="font-semibold">
                        ID: {appointments[currentIndex].appointment_id}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-2 text-[#05464e]" />
                      <span>
                        {doctors[appointments[currentIndex].appointment_id] ||
                          "Loading..."}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-[#05464e]" />
                      <span>
                        {appointments[currentIndex].available_start_date &&
                          new Date(
                            appointments[currentIndex].available_start_date
                          ).toLocaleDateString()}{" "}
                        {appointments[currentIndex].available_start_time &&
                          appointments[currentIndex].available_start_time.slice(
                            0,
                            5
                          )}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      handleReviewClick(appointments[currentIndex])
                    }
                    className="bg-[#05464e] text-white text-sm font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#05464e] focus:ring-opacity-50"
                  >
                    Review
                  </button>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-full bg-white hover:bg-gray-100 transition duration-300"
                    disabled={appointments.length <= 1 || animating}
                  >
                    <ChevronLeft className="w-5 h-5 text-[#05464e]" />
                  </button>
                  <span className="text-sm text-[#05464e]">
                    {appointments.length > 0
                      ? `${currentIndex + 1} of ${appointments.length}`
                      : "0 of 0"}
                  </span>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-full bg-white hover:bg-gray-100 transition duration-300"
                    disabled={appointments.length <= 1 || animating}
                  >
                    <ChevronRight className="w-5 h-5 text-[#05464e]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isPopupOpen && (
          <ReviewPopup
            onClose={() => {
              setIsPopupOpen(false);
              setSelectedAppointment(null);
              dispatch(fetchUnreviewedAppointments());
            }}
            appointmentId={selectedAppointment.appointment_id}
            staffId={selectedAppointment.staff_id}
          />
        )}
      </div>
    </div>
  );
};

export default UnreviewedAppointments;
