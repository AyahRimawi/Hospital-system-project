import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import {
  setAvailability,
  getAvailabilities,
  updateAvailability,
  deleteAvailability,
} from "../../store/doctorSchedulingSlice"; // هدول همة ال actions
import {
  Calendar,
  Clock,
  Trash2,
  Save,
  Edit2,
  PlusCircle,
  Check,
  X,
} from "lucide-react";

const DoctorScheduling = () => {
  const dispatch = useDispatch(); // لحتى نستدعي اي فعل نريده
  const navigate = useNavigate();
  const { availabilities, loading, error } = useSelector(
    (state) => state.doctorScheduling
  ); // هي اشياء ال initialState و name

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // ===============================
  //*  استخدام useEffect لجلب البيانات
  useEffect(() => {
    const fetchAvailabilities = async () => {
      try {
        // بنستدعي action الي هو getAvailabilities
        //
        await dispatch(getAvailabilities()).unwrap();
      } catch (error) {
        if (error.status === 401) {
          navigate("/login");
        }
      }
    };
    // ==========================

    fetchAvailabilities();
  }, [dispatch, navigate]);

  const formatDate = (date) => {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    return utcDate.toISOString().split("T")[0];
  };

  const handleSave = async () => {
    if (!startDate || !startTime || !endTime) {
      alert("Please fill in all required fields");
      return;
    }

    const availabilityData = {
      availableStartDate: formatDate(startDate),
      availableEndDate: endDate ? formatDate(endDate) : null,
      startTime,
      endTime,
    };

    try {
      if (selectedAvailability) {
        await dispatch(
          updateAvailability({
            availableId: selectedAvailability.available_id,
            ...availabilityData,
          })
        ).unwrap();
      } else {
        await dispatch(setAvailability(availabilityData)).unwrap();
      }
      resetForm();
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving availability:", error);
    }
  };

  const handleDelete = async () => {
    if (selectedAvailability) {
      if (
        window.confirm("Are you sure you want to delete this availability?")
      ) {
        try {
          await dispatch(
            deleteAvailability(selectedAvailability.available_id)
          ).unwrap();
          resetForm();
        } catch (error) {
          console.error("Error deleting availability:", error);
        }
      }
    }
  };

  const resetForm = () => {
    setStartDate(null);
    setEndDate(null);
    setStartTime("");
    setEndTime("");
    setSelectedAvailability(null);
  };

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date) < today;
  };

  return (
    <div className="min-h-screen bg-white p-6 font-sans">
      <div className="mt-16 max-w-5xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-lg">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-[#1F2B6C] mb-8 text-center relative">
            <span>Doctor's Schedule Master</span>
            <div className="absolute -bottom-2 w-96 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#BFD2F8]"></div>
          </h2>

          {!isFormOpen && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="w-96 m-auto bg-[#1F2B6C] text-white py-3 rounded-full text-lg font-bold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-md mb-6 flex items-center justify-center"
            >
              <PlusCircle className="mr-2" size={20} />
              Add New Availability
            </button>
          )}

          {isFormOpen && (
            <div className="bg-white border-2 border-[#BFD2F8] rounded-xl p-4 mb-6 transition-all duration-500 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="group">
                  <label className="block text-sm font-medium text-[#1F2B6C] mb-1 transition-all duration-300 group-hover:text-opacity-80">
                    Start Date
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={setStartDate}
                    minDate={new Date()}
                    dateFormat="yyyy-MM-dd"
                    className="w-full p-2 bg-white border-2 border-[#BFD2F8] rounded-lg focus:ring-2 focus:ring-[#1F2B6C] focus:border-transparent transition-all duration-300 hover:border-[#1F2B6C] text-[#1F2B6C] placeholder-[#1F2B6C]::placeholder"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-[#1F2B6C] mb-1 transition-all duration-300 group-hover:text-opacity-80">
                    End Date (Optional)
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={setEndDate}
                    minDate={startDate || new Date()}
                    dateFormat="yyyy-MM-dd"
                    className="w-full p-2 bg-white border-2 border-[#BFD2F8] rounded-lg focus:ring-2 focus:ring-[#1F2B6C] focus:border-transparent transition-all duration-300 hover:border-[#1F2B6C] text-[#1F2B6C] placeholder-[#1F2B6C]::placeholder"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-[#1F2B6C] mb-1 transition-all duration-300 group-hover:text-opacity-80">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full p-2 bg-white border-2 border-[#BFD2F8] rounded-lg focus:ring-2 focus:ring-[#1F2B6C] focus:border-transparent transition-all duration-300 hover:border-[#1F2B6C] text-[#1F2B6C] placeholder-[#1F2B6C]::placeholder"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-[#1F2B6C] mb-1 transition-all duration-300 group-hover:text-opacity-80">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full p-2 bg-white border-2 border-[#BFD2F8] rounded-lg focus:ring-2 focus:ring-[#1F2B6C] focus:border-transparent transition-all duration-300 hover:border-[#1F2B6C] text-[#1F2B6C] placeholder-[#1F2B6C]::placeholder"
                  />
                </div>
              </div>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={handleSave}
                  className="bg-[#1F2B6C] text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 flex items-center transform hover:scale-105 hover:shadow-md text-sm"
                >
                  {selectedAvailability ? (
                    <Edit2 className="mr-1" size={16} />
                  ) : (
                    <Save className="mr-1" size={16} />
                  )}
                  {selectedAvailability ? "Update" : "Save"}
                </button>
                {selectedAvailability && (
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 flex items-center transform hover:scale-105 hover:shadow-md text-sm"
                  >
                    <Trash2 className="mr-1" size={16} />
                    Delete
                  </button>
                )}
                <button
                  onClick={() => {
                    resetForm();
                    setIsFormOpen(false);
                  }}
                  className="bg-gray-400 text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 flex items-center transform hover:scale-105 hover:shadow-md text-sm"
                >
                  <X className="mr-1" size={16} />
                  Cancel
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center space-x-2 my-6">
              <div className="w-3 h-3 bg-[#1F2B6C] rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-[#1F2B6C] rounded-full animate-bounce200"></div>
              <div className="w-3 h-3 bg-[#1F2B6C] rounded-full animate-bounce400"></div>
            </div>
          )}
          {error && (
            <p className="mt-4 text-center text-red-600 bg-red-100 rounded-lg p-3 animate-pulse">
              {error}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8">
        <h3 className="text-2xl font-bold text-[#1F2B6C] mb-6 text-center">
          Your Scheduled Availabilities
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {availabilities && availabilities.length > 0 ? (
            availabilities
              .filter((availability) => !availability.is_deleted)
              .map((availability) => (
                <div
                  key={availability.available_id}
                  className={`bg-white border-2 border-[#BFD2F8] p-4 rounded-xl cursor-pointer hover:shadow-md transition-all duration-500 transform hover:scale-105 group ${
                    isPastDate(availability.available_start_date)
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                  onClick={() => {
                    if (!isPastDate(availability.available_start_date)) {
                      setSelectedAvailability(availability);
                      setStartDate(new Date(availability.available_start_date));
                      setEndDate(
                        availability.available_end_date
                          ? new Date(availability.available_end_date)
                          : null
                      );
                      setStartTime(
                        availability.available_start_time.slice(0, 5)
                      );
                      setEndTime(availability.available_end_time.slice(0, 5));
                      setIsFormOpen(true);
                    }
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <Calendar
                        className="mr-2 text-[#1F2B6C] group-hover:text-opacity-80 transition-all duration-300"
                        size={20}
                      />
                      <p className="font-medium text-[#1F2B6C] text-base">
                        {new Date(
                          availability.available_start_date
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`text-white text-xs font-bold px-2 py-1 rounded-full ${
                        isPastDate(availability.available_start_date)
                          ? "bg-gray-500"
                          : "bg-[#1F2B6C]"
                      }`}
                    >
                      {isPastDate(availability.available_start_date)
                        ? "Ended"
                        : "Active"}
                    </span>
                  </div>
                  {availability.available_end_date && (
                    <p className="text-[#1F2B6C] text-opacity-70 mb-2 text-sm">
                      To:{" "}
                      {new Date(
                        availability.available_end_date
                      ).toLocaleDateString()}
                    </p>
                  )}
                  <div className="flex items-center mt-3">
                    <Clock
                      className="mr-2 text-[#1F2B6C] group-hover:text-opacity-80 transition-all duration-300"
                      size={16}
                    />
                    <p className="text-[#1F2B6C] text-sm">
                      {availability.available_start_time.slice(0, 5)} -{" "}
                      {availability.available_end_time.slice(0, 5)}
                    </p>
                  </div>
                  {!isPastDate(availability.available_start_date) && (
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Edit2 className="text-[#1F2B6C]" size={14} />
                    </div>
                  )}
                </div>
              ))
          ) : (
            <p className="col-span-3 text-center text-[#1F2B6C] text-lg bg-[#BFD2F8] bg-opacity-30 rounded-lg p-6 animate-pulse">
              No availabilities found. Add your first availability now!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorScheduling;
