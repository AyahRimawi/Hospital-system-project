// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useNavigate } from "react-router-dom";
// import {
//   setAvailability,
//   getAvailabilities,
//   updateAvailability,
//   deleteAvailability,
// } from "../../store/doctorSchedulingSlice";

// const DoctorScheduling = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { availabilities, loading, error } = useSelector(
//     (state) => state.doctorScheduling
//   );
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [selectedAvailability, setSelectedAvailability] = useState(null);

//   useEffect(() => {
//     const fetchAvailabilities = async () => {
//       try {
//         await dispatch(getAvailabilities()).unwrap();
//       } catch (error) {
//         if (error.status === 401) {
//           navigate("/login");
//         }
//       }
//     };

//     fetchAvailabilities();
//   }, [dispatch, navigate]);

//   const handleSave = async () => {
//     if (!startDate || !startTime || !endTime) {
//       alert("Please fill in all required fields");
//       return;
//     }

//     const availabilityData = {
//       availableStartDate: startDate.toISOString().split("T")[0],
//       availableEndDate: endDate ? endDate.toISOString().split("T")[0] : null,
//       startTime,
//       endTime,
//     };

//     try {
//       if (selectedAvailability) {
//         await dispatch(
//           updateAvailability({
//             availableId: selectedAvailability.available_id,
//             ...availabilityData,
//           })
//         ).unwrap();
//       } else {
//         await dispatch(setAvailability(availabilityData)).unwrap();
//       }
//       resetForm();
//     } catch (error) {
//       console.error("Error saving availability:", error);
//     }
//   };

//   const handleDelete = async () => {
//     if (selectedAvailability) {
//       if (
//         window.confirm("Are you sure you want to delete this availability?")
//       ) {
//         try {
//           await dispatch(
//             deleteAvailability(selectedAvailability.available_id)
//           ).unwrap();
//           resetForm();
//         } catch (error) {
//           console.error("Error deleting availability:", error);
//         }
//       }
//     }
//   };

//   const resetForm = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setStartTime("");
//     setEndTime("");
//     setSelectedAvailability(null);
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-10">
//       <h2 className="text-3xl font-bold text-[#1F2B6C] mb-6">
//         Doctor Scheduling
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Start Date
//           </label>
//           <DatePicker
//             selected={startDate}
//             onChange={setStartDate}
//             minDate={new Date()}
//             dateFormat="yyyy-MM-dd"
//             className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#BFD2F8]"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             End Date (Optional)
//           </label>
//           <DatePicker
//             selected={endDate}
//             onChange={setEndDate}
//             minDate={startDate || new Date()}
//             dateFormat="yyyy-MM-dd"
//             className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#BFD2F8]"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Start Time
//           </label>
//           <input
//             type="time"
//             value={startTime}
//             onChange={(e) => setStartTime(e.target.value)}
//             className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#BFD2F8]"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             End Time
//           </label>
//           <input
//             type="time"
//             value={endTime}
//             onChange={(e) => setEndTime(e.target.value)}
//             className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#BFD2F8]"
//           />
//         </div>
//       </div>
//       <div className="flex justify-between">
//         <button
//           onClick={handleSave}
//           className="bg-[#1F2B6C] text-white px-6 py-2 rounded-md hover:bg-[#BFD2F8] hover:text-[#1F2B6C] transition-colors duration-300"
//         >
//           {selectedAvailability ? "Update" : "Save"}
//         </button>
//         {selectedAvailability && (
//           <button
//             onClick={handleDelete}
//             className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
//           >
//             Delete
//           </button>
//         )}
//       </div>
//       {loading && <p className="mt-4 text-center">Loading...</p>}
//       {error && <p className="mt-4 text-center text-red-500">{error}</p>}
//       <div className="mt-10">
//         <h3 className="text-2xl font-semibold text-[#1F2B6C] mb-4">
//           Scheduled Availabilities
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {availabilities && availabilities.length > 0 ? (
//             availabilities.map((availability) => (
//               <div
//                 key={availability.available_id}
//                 className={`bg-[#BFD2F8] p-4 rounded-md cursor-pointer hover:shadow-md transition-all duration-300 ${
//                   new Date(availability.available_start_date) < new Date()
//                     ? "opacity-50"
//                     : ""
//                 }`}
//                 onClick={() => {
//                   setSelectedAvailability(availability);
//                   setStartDate(new Date(availability.available_start_date));
//                   setEndDate(
//                     availability.available_end_date
//                       ? new Date(availability.available_end_date)
//                       : null
//                   );
//                   setStartTime(availability.available_start_time.slice(0, 5));
//                   setEndTime(availability.available_end_time.slice(0, 5));
//                 }}
//               >
//                 <p className="font-medium text-[#1F2B6C]">
//                   {new Date(
//                     availability.available_start_date
//                   ).toLocaleDateString()}
//                   {availability.available_end_date &&
//                     ` - ${new Date(
//                       availability.available_end_date
//                     ).toLocaleDateString()}`}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   {availability.available_start_time.slice(0, 5)} -{" "}
//                   {availability.available_end_time.slice(0, 5)}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p className="col-span-3 text-center text-gray-500">
//               No availabilities found.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorScheduling;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useNavigate } from "react-router-dom";
// import {
//   setAvailability,
//   getAvailabilities,
//   updateAvailability,
//   deleteAvailability,
// } from "../../store/doctorSchedulingSlice";

// const DoctorScheduling = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { availabilities, loading, error } = useSelector(
//     (state) => state.doctorScheduling
//   );
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [selectedAvailability, setSelectedAvailability] = useState(null);

//   useEffect(() => {
//     const fetchAvailabilities = async () => {
//       try {
//         await dispatch(getAvailabilities()).unwrap();
//       } catch (error) {
//         if (error.status === 401) {
//           navigate("/login");
//         }
//       }
//     };

//     fetchAvailabilities();
//   }, [dispatch, navigate]);

//   const formatDate = (date) => {
//     const utcDate = new Date(
//       Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
//     );
//     return utcDate.toISOString().split("T")[0];
//   };

//   const handleSave = async () => {
//     if (!startDate || !startTime || !endTime) {
//       alert("Please fill in all required fields");
//       return;
//     }

//     const availabilityData = {
//       availableStartDate: formatDate(startDate),
//       availableEndDate: endDate ? formatDate(endDate) : null,
//       startTime,
//       endTime,
//     };

//     try {
//       if (selectedAvailability) {
//         await dispatch(
//           updateAvailability({
//             availableId: selectedAvailability.available_id,
//             ...availabilityData,
//           })
//         ).unwrap();
//       } else {
//         await dispatch(setAvailability(availabilityData)).unwrap();
//       }
//       resetForm();
//     } catch (error) {
//       console.error("Error saving availability:", error);
//     }
//   };

//   const handleDelete = async () => {
//     if (selectedAvailability) {
//       if (
//         window.confirm("Are you sure you want to delete this availability?")
//       ) {
//         try {
//           await dispatch(
//             deleteAvailability(selectedAvailability.available_id)
//           ).unwrap();
//           resetForm();
//         } catch (error) {
//           console.error("Error deleting availability:", error);
//         }
//       }
//     }
//   };

//   const resetForm = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setStartTime("");
//     setEndTime("");
//     setSelectedAvailability(null);
//   };

//   return (
//     <>

//     <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-10">
//       <h2 className="text-3xl font-bold text-[#1F2B6C] mb-6">
//         Doctor Scheduling
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Start Date
//           </label>
//           <DatePicker
//             selected={startDate}
//             onChange={setStartDate}
//             minDate={new Date()}
//             dateFormat="yyyy-MM-dd"
//             className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#BFD2F8]"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             End Date (Optional)
//           </label>
//           <DatePicker
//             selected={endDate}
//             onChange={setEndDate}
//             minDate={startDate || new Date()}
//             dateFormat="yyyy-MM-dd"
//             className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#BFD2F8]"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Start Time
//           </label>
//           <input
//             type="time"
//             value={startTime}
//             onChange={(e) => setStartTime(e.target.value)}
//             className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#BFD2F8]"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             End Time
//           </label>
//           <input
//             type="time"
//             value={endTime}
//             onChange={(e) => setEndTime(e.target.value)}
//             className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#BFD2F8]"
//           />
//         </div>
//       </div>
//       <div className="flex justify-between">
//         <button
//           onClick={handleSave}
//           className="bg-[#1F2B6C] text-white px-6 py-2 rounded-md hover:bg-[#BFD2F8] hover:text-[#1F2B6C] transition-colors duration-300"
//         >
//           {selectedAvailability ? "Update" : "Save"}
//         </button>
//         {selectedAvailability && (
//           <button
//             onClick={handleDelete}
//             className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
//           >
//             Delete
//           </button>
//         )}
//       </div>
//       {loading && <p className="mt-4 text-center">Loading...</p>}
//       {error && <p className="mt-4 text-center text-red-500">{error}</p>}
//       <div className="mt-10">
//         <h3 className="text-2xl font-semibold text-[#1F2B6C] mb-4">
//           Scheduled Availabilities
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {availabilities && availabilities.length > 0 ? (
//             availabilities
//               .filter((availability) => !availability.is_deleted)
//               .map((availability) => (
//                 <div
//                   key={availability.available_id}
//                   className={`bg-[#BFD2F8] p-4 rounded-md cursor-pointer hover:shadow-md transition-all duration-300 ${
//                     new Date(availability.available_start_date) < new Date()
//                       ? "opacity-50"
//                       : ""
//                   }`}
//                   onClick={() => {
//                     setSelectedAvailability(availability);
//                     setStartDate(new Date(availability.available_start_date));
//                     setEndDate(
//                       availability.available_end_date
//                         ? new Date(availability.available_end_date)
//                         : null
//                     );
//                     setStartTime(availability.available_start_time.slice(0, 5));
//                     setEndTime(availability.available_end_time.slice(0, 5));
//                   }}
//                 >
//                   <p className="font-medium text-[#1F2B6C]">
//                     {new Date(
//                       availability.available_start_date
//                     ).toLocaleDateString()}
//                     {availability.available_end_date &&
//                       ` - ${new Date(
//                         availability.available_end_date
//                       ).toLocaleDateString()}`}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     {availability.available_start_time.slice(0, 5)} -{" "}
//                     {availability.available_end_time.slice(0, 5)}
//                   </p>
//                 </div>
//               ))
//           ) : (
//             <p className="col-span-3 text-center text-gray-500">
//               No availabilities found.
//             </p>
//           )}
//         </div>
//       </div>
//     </div></>
//   );
// };

// export default DoctorScheduling;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useNavigate } from "react-router-dom";
// import {
//   setAvailability,
//   getAvailabilities,
//   updateAvailability,
//   deleteAvailability,
// } from "../../store/doctorSchedulingSlice";
// import { Calendar, Clock, Trash2, Save, Edit2, PlusCircle } from "lucide-react";

// const DoctorScheduling = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { availabilities, loading, error } = useSelector(
//     (state) => state.doctorScheduling
//   );
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [selectedAvailability, setSelectedAvailability] = useState(null);

//   useEffect(() => {
//     const fetchAvailabilities = async () => {
//       try {
//         await dispatch(getAvailabilities()).unwrap();
//       } catch (error) {
//         if (error.status === 401) {
//           navigate("/login");
//         }
//       }
//     };

//     fetchAvailabilities();
//   }, [dispatch, navigate]);

//   const formatDate = (date) => {
//     const utcDate = new Date(
//       Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
//     );
//     return utcDate.toISOString().split("T")[0];
//   };

//   const handleSave = async () => {
//     if (!startDate || !startTime || !endTime) {
//       alert("Please fill in all required fields");
//       return;
//     }

//     const availabilityData = {
//       availableStartDate: formatDate(startDate),
//       availableEndDate: endDate ? formatDate(endDate) : null,
//       startTime,
//       endTime,
//     };

//     try {
//       if (selectedAvailability) {
//         await dispatch(
//           updateAvailability({
//             availableId: selectedAvailability.available_id,
//             ...availabilityData,
//           })
//         ).unwrap();
//       } else {
//         await dispatch(setAvailability(availabilityData)).unwrap();
//       }
//       resetForm();
//     } catch (error) {
//       console.error("Error saving availability:", error);
//     }
//   };

//   const handleDelete = async () => {
//     if (selectedAvailability) {
//       if (
//         window.confirm("Are you sure you want to delete this availability?")
//       ) {
//         try {
//           await dispatch(
//             deleteAvailability(selectedAvailability.available_id)
//           ).unwrap();
//           resetForm();
//         } catch (error) {
//           console.error("Error deleting availability:", error);
//         }
//       }
//     }
//   };

//   const resetForm = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setStartTime("");
//     setEndTime("");
//     setSelectedAvailability(null);
//   };

//   return (
//     <div className="bg-white min-h-screen p-8 mt-8 font-serif">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
//         <div className="p-8">
//           <h2 className="text-3xl font-bold text-[#1F2B6C] mb-6 flex items-center">
//             <Calendar className="mr-2" size={28} />
//             Doctor Scheduling
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-[#1F2B6C] mb-2">
//                 Start Date
//               </label>
//               <DatePicker
//                 selected={startDate}
//                 onChange={setStartDate}
//                 minDate={new Date()}
//                 dateFormat="yyyy-MM-dd"
//                 className="w-full p-2 border-2 border-[#BFD2F8] rounded-md focus:ring-2 focus:ring-[#1F2B6C] focus:border-transparent transition-all duration-300"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-[#1F2B6C] mb-2">
//                 End Date (Optional)
//               </label>
//               <DatePicker
//                 selected={endDate}
//                 onChange={setEndDate}
//                 minDate={startDate || new Date()}
//                 dateFormat="yyyy-MM-dd"
//                 className="w-full p-2 border-2 border-[#BFD2F8] rounded-md focus:ring-2 focus:ring-[#1F2B6C] focus:border-transparent transition-all duration-300"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-[#1F2B6C] mb-2">
//                 Start Time
//               </label>
//               <input
//                 type="time"
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 className="w-full p-2 border-2 border-[#BFD2F8] rounded-md focus:ring-2 focus:ring-[#1F2B6C] focus:border-transparent transition-all duration-300"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-[#1F2B6C] mb-2">
//                 End Time
//               </label>
//               <input
//                 type="time"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 className="w-full p-2 border-2 border-[#BFD2F8] rounded-md focus:ring-2 focus:ring-[#1F2B6C] focus:border-transparent transition-all duration-300"
//               />
//             </div>
//           </div>
//           <div className="flex justify-between">
//             <button
//               onClick={handleSave}
//               className="bg-[#1F2B6C] text-white px-6 py-2 rounded-md hover:bg-[#BFD2F8] hover:text-[#1F2B6C] transition-all duration-300 flex items-center transform hover:scale-105"
//             >
//               {selectedAvailability ? (
//                 <Edit2 className="mr-2" size={20} />
//               ) : (
//                 <Save className="mr-2" size={20} />
//               )}
//               {selectedAvailability ? "Update" : "Save"}
//             </button>
//             {selectedAvailability && (
//               <button
//                 onClick={handleDelete}
//                 className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-all duration-300 flex items-center transform hover:scale-105"
//               >
//                 <Trash2 className="mr-2" size={20} />
//                 Delete
//               </button>
//             )}
//           </div>
//           {loading && (
//             <p className="mt-4 text-center text-[#1F2B6C]">Loading...</p>
//           )}
//           {error && <p className="mt-4 text-center text-red-500">{error}</p>}
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto mt-10">
//         <h3 className="text-2xl font-semibold text-[#1F2B6C] mb-4 flex items-center">
//           <PlusCircle className="mr-2" size={24} />
//           Scheduled Availabilities
//         </h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {availabilities && availabilities.length > 0 ? (
//             availabilities
//               .filter((availability) => !availability.is_deleted)
//               .map((availability) => (
//                 <div
//                   key={availability.available_id}
//                   className={`bg-white border-2 border-[#BFD2F8] p-4 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
//                     new Date(availability.available_start_date) < new Date()
//                       ? "opacity-50"
//                       : ""
//                   }`}
//                   onClick={() => {
//                     setSelectedAvailability(availability);
//                     setStartDate(new Date(availability.available_start_date));
//                     setEndDate(
//                       availability.available_end_date
//                         ? new Date(availability.available_end_date)
//                         : null
//                     );
//                     setStartTime(availability.available_start_time.slice(0, 5));
//                     setEndTime(availability.available_end_time.slice(0, 5));
//                   }}
//                 >
//                   <p className="font-medium text-[#1F2B6C] mb-2 flex items-center">
//                     <Calendar className="mr-2" size={16} />
//                     {new Date(
//                       availability.available_start_date
//                     ).toLocaleDateString()}
//                     {availability.available_end_date &&
//                       ` - ${new Date(
//                         availability.available_end_date
//                       ).toLocaleDateString()}`}
//                   </p>
//                   <p className="text-sm text-[#1F2B6C] flex items-center">
//                     <Clock className="mr-2" size={16} />
//                     {availability.available_start_time.slice(0, 5)} -{" "}
//                     {availability.available_end_time.slice(0, 5)}
//                   </p>
//                 </div>
//               ))
//           ) : (
//             <p className="col-span-3 text-center text-[#1F2B6C]">
//               No availabilities found.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorScheduling;

//! فوق وتحت اختار
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useNavigate } from "react-router-dom";
// import {
//   setAvailability,
//   getAvailabilities,
//   updateAvailability,
//   deleteAvailability,
// } from "../../store/doctorSchedulingSlice";
// import { Calendar, Clock, Trash2, Save, Edit2, PlusCircle } from "lucide-react";

// const DoctorScheduling = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { availabilities, loading, error } = useSelector(
//     (state) => state.doctorScheduling
//   );
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [selectedAvailability, setSelectedAvailability] = useState(null);

//   useEffect(() => {
//     const fetchAvailabilities = async () => {
//       try {
//         await dispatch(getAvailabilities()).unwrap();
//       } catch (error) {
//         if (error.status === 401) {
//           navigate("/login");
//         }
//       }
//     };

//     fetchAvailabilities();
//   }, [dispatch, navigate]);

//   const formatDate = (date) => {
//     const utcDate = new Date(
//       Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
//     );
//     return utcDate.toISOString().split("T")[0];
//   };

//   const handleSave = async () => {
//     if (!startDate || !startTime || !endTime) {
//       alert("Please fill in all required fields");
//       return;
//     }

//     const availabilityData = {
//       availableStartDate: formatDate(startDate),
//       availableEndDate: endDate ? formatDate(endDate) : null,
//       startTime,
//       endTime,
//     };

//     try {
//       if (selectedAvailability) {
//         await dispatch(
//           updateAvailability({
//             availableId: selectedAvailability.available_id,
//             ...availabilityData,
//           })
//         ).unwrap();
//       } else {
//         await dispatch(setAvailability(availabilityData)).unwrap();
//       }
//       resetForm();
//     } catch (error) {
//       console.error("Error saving availability:", error);
//     }
//   };

//   const handleDelete = async () => {
//     if (selectedAvailability) {
//       if (
//         window.confirm("Are you sure you want to delete this availability?")
//       ) {
//         try {
//           await dispatch(
//             deleteAvailability(selectedAvailability.available_id)
//           ).unwrap();
//           resetForm();
//         } catch (error) {
//           console.error("Error deleting availability:", error);
//         }
//       }
//     }
//   };

//   const resetForm = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setStartTime("");
//     setEndTime("");
//     setSelectedAvailability(null);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#1F2B6C] to-[#BFD2F8] p-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(191,210,248,0.7)]">
//         <div className="p-8">
//           <h2 className="text-4xl font-bold text-[#1F2B6C] mb-8 flex items-center justify-center">
//             <Calendar className="mr-3" size={36} />
//             Doctor Scheduling
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
//             <div className="group">
//               <label className="block text-sm font-medium text-[#1F2B6C] mb-2 transition-all duration-300 group-hover:text-[#4A69DD]">
//                 Start Date
//               </label>
//               <DatePicker
//                 selected={startDate}
//                 onChange={setStartDate}
//                 minDate={new Date()}
//                 dateFormat="yyyy-MM-dd"
//                 className="w-full p-3 border-2 border-[#BFD2F8] rounded-lg focus:ring-4 focus:ring-[#4A69DD] focus:border-transparent transition-all duration-300 hover:border-[#4A69DD]"
//               />
//             </div>
//             <div className="group">
//               <label className="block text-sm font-medium text-[#1F2B6C] mb-2 transition-all duration-300 group-hover:text-[#4A69DD]">
//                 End Date (Optional)
//               </label>
//               <DatePicker
//                 selected={endDate}
//                 onChange={setEndDate}
//                 minDate={startDate || new Date()}
//                 dateFormat="yyyy-MM-dd"
//                 className="w-full p-3 border-2 border-[#BFD2F8] rounded-lg focus:ring-4 focus:ring-[#4A69DD] focus:border-transparent transition-all duration-300 hover:border-[#4A69DD]"
//               />
//             </div>
//             <div className="group">
//               <label className="block text-sm font-medium text-[#1F2B6C] mb-2 transition-all duration-300 group-hover:text-[#4A69DD]">
//                 Start Time
//               </label>
//               <input
//                 type="time"
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 className="w-full p-3 border-2 border-[#BFD2F8] rounded-lg focus:ring-4 focus:ring-[#4A69DD] focus:border-transparent transition-all duration-300 hover:border-[#4A69DD]"
//               />
//             </div>
//             <div className="group">
//               <label className="block text-sm font-medium text-[#1F2B6C] mb-2 transition-all duration-300 group-hover:text-[#4A69DD]">
//                 End Time
//               </label>
//               <input
//                 type="time"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 className="w-full p-3 border-2 border-[#BFD2F8] rounded-lg focus:ring-4 focus:ring-[#4A69DD] focus:border-transparent transition-all duration-300 hover:border-[#4A69DD]"
//               />
//             </div>
//           </div>
//           <div className="flex justify-center space-x-4">
//             <button
//               onClick={handleSave}
//               className="bg-[#4A69DD] text-white px-8 py-3 rounded-full hover:bg-[#3A539B] transition-all duration-300 flex items-center transform hover:scale-105 hover:shadow-lg"
//             >
//               {selectedAvailability ? (
//                 <Edit2 className="mr-2" size={20} />
//               ) : (
//                 <Save className="mr-2" size={20} />
//               )}
//               {selectedAvailability ? "Update" : "Save"}
//             </button>
//             {selectedAvailability && (
//               <button
//                 onClick={handleDelete}
//                 className="bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition-all duration-300 flex items-center transform hover:scale-105 hover:shadow-lg"
//               >
//                 <Trash2 className="mr-2" size={20} />
//                 Delete
//               </button>
//             )}
//           </div>
//           {loading && (
//             <p className="mt-6 text-center text-[#1F2B6C] animate-pulse">
//               Loading...
//             </p>
//           )}
//           {error && (
//             <p className="mt-6 text-center text-red-500 animate-bounce">
//               {error}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto mt-12">
//         <h3 className="text-3xl font-semibold text-white mb-6 flex items-center justify-center">
//           <PlusCircle className="mr-3" size={32} />
//           Scheduled Availabilities
//         </h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {availabilities && availabilities.length > 0 ? (
//             availabilities
//               .filter((availability) => !availability.is_deleted)
//               .map((availability) => (
//                 <div
//                   key={availability.available_id}
//                   className={`bg-white border-2 border-[#BFD2F8] p-6 rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-500 transform hover:scale-105 ${
//                     new Date(availability.available_start_date) < new Date()
//                       ? "opacity-60"
//                       : ""
//                   }`}
//                   onClick={() => {
//                     setSelectedAvailability(availability);
//                     setStartDate(new Date(availability.available_start_date));
//                     setEndDate(
//                       availability.available_end_date
//                         ? new Date(availability.available_end_date)
//                         : null
//                     );
//                     setStartTime(availability.available_start_time.slice(0, 5));
//                     setEndTime(availability.available_end_time.slice(0, 5));
//                   }}
//                 >
//                   <p className="font-medium text-[#1F2B6C] mb-3 flex items-center">
//                     <Calendar className="mr-2 text-[#4A69DD]" size={20} />
//                     {new Date(
//                       availability.available_start_date
//                     ).toLocaleDateString()}
//                     {availability.available_end_date &&
//                       ` - ${new Date(
//                         availability.available_end_date
//                       ).toLocaleDateString()}`}
//                   </p>
//                   <p className="text-sm text-[#4A69DD] flex items-center">
//                     <Clock className="mr-2" size={18} />
//                     {availability.available_start_time.slice(0, 5)} -{" "}
//                     {availability.available_end_time.slice(0, 5)}
//                   </p>
//                 </div>
//               ))
//           ) : (
//             <p className="col-span-3 text-center text-white text-lg">
//               No availabilities found.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorScheduling;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useNavigate } from "react-router-dom";
// import {
//   setAvailability,
//   getAvailabilities,
//   updateAvailability,
//   deleteAvailability,
// } from "../../store/doctorSchedulingSlice";
// import { Calendar, Clock, Trash2, Save, Edit2, PlusCircle } from "lucide-react";

// const DoctorScheduling = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { availabilities, loading, error } = useSelector(
//     (state) => state.doctorScheduling
//   );
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [selectedAvailability, setSelectedAvailability] = useState(null);

//   useEffect(() => {
//     const fetchAvailabilities = async () => {
//       try {
//         await dispatch(getAvailabilities()).unwrap();
//       } catch (error) {
//         if (error.status === 401) {
//           navigate("/login");
//         }
//       }
//     };

//     fetchAvailabilities();
//   }, [dispatch, navigate]);

//   const formatDate = (date) => {
//     const utcDate = new Date(
//       Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
//     );
//     return utcDate.toISOString().split("T")[0];
//   };

//   const handleSave = async () => {
//     if (!startDate || !startTime || !endTime) {
//       alert("Please fill in all required fields");
//       return;
//     }

//     const availabilityData = {
//       availableStartDate: formatDate(startDate),
//       availableEndDate: endDate ? formatDate(endDate) : null,
//       startTime,
//       endTime,
//     };

//     try {
//       if (selectedAvailability) {
//         await dispatch(
//           updateAvailability({
//             availableId: selectedAvailability.available_id,
//             ...availabilityData,
//           })
//         ).unwrap();
//       } else {
//         await dispatch(setAvailability(availabilityData)).unwrap();
//       }
//       resetForm();
//     } catch (error) {
//       console.error("Error saving availability:", error);
//     }
//   };

//   const handleDelete = async () => {
//     if (selectedAvailability) {
//       if (
//         window.confirm("Are you sure you want to delete this availability?")
//       ) {
//         try {
//           await dispatch(
//             deleteAvailability(selectedAvailability.available_id)
//           ).unwrap();
//           resetForm();
//         } catch (error) {
//           console.error("Error deleting availability:", error);
//         }
//       }
//     }
//   };

//   const resetForm = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setStartTime("");
//     setEndTime("");
//     setSelectedAvailability(null);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#1F2B6C] to-[#BFD2F8] p-4 sm:p-6">
//       <div className="mt-8 max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_20px_rgba(191,210,248,0.7)]">
//         <div className="p-6">
//           <h2 className="text-3xl font-bold text-[#1F2B6C] mb-6 flex items-center justify-center">
//             <Calendar className="mr-2" size={28} />
//             Doctor Scheduling
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//             <div className="group">
//               <label className="block text-sm font-medium text-[#1F2B6C] mb-1 transition-all duration-300 group-hover:text-[#4A69DD]">
//                 Start Date
//               </label>
//               <DatePicker
//                 selected={startDate}
//                 onChange={setStartDate}
//                 minDate={new Date()}
//                 dateFormat="yyyy-MM-dd"
//                 className="w-full p-2 text-sm border-2 border-[#BFD2F8] rounded-md focus:ring-2 focus:ring-[#4A69DD] focus:border-transparent transition-all duration-300 hover:border-[#4A69DD]"
//               />
//             </div>
//             <div className="group">
//               <label className="block text-sm font-medium text-[#1F2B6C] mb-1 transition-all duration-300 group-hover:text-[#4A69DD]">
//                 End Date (Optional)
//               </label>
//               <DatePicker
//                 selected={endDate}
//                 onChange={setEndDate}
//                 minDate={startDate || new Date()}
//                 dateFormat="yyyy-MM-dd"
//                 className="w-full p-2 text-sm border-2 border-[#BFD2F8] rounded-md focus:ring-2 focus:ring-[#4A69DD] focus:border-transparent transition-all duration-300 hover:border-[#4A69DD]"
//               />
//             </div>
//             <div className="group">
//               <label className="block text-sm font-medium text-[#1F2B6C] mb-1 transition-all duration-300 group-hover:text-[#4A69DD]">
//                 Start Time
//               </label>
//               <input
//                 type="time"
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 className="w-full p-2 text-sm border-2 border-[#BFD2F8] rounded-md focus:ring-2 focus:ring-[#4A69DD] focus:border-transparent transition-all duration-300 hover:border-[#4A69DD]"
//               />
//             </div>
//             <div className="group">
//               <label className="block text-sm font-medium text-[#1F2B6C] mb-1 transition-all duration-300 group-hover:text-[#4A69DD]">
//                 End Time
//               </label>
//               <input
//                 type="time"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 className="w-full p-2 text-sm border-2 border-[#BFD2F8] rounded-md focus:ring-2 focus:ring-[#4A69DD] focus:border-transparent transition-all duration-300 hover:border-[#4A69DD]"
//               />
//             </div>
//           </div>
//           <div className="flex justify-center space-x-3">
//             <button
//               onClick={handleSave}
//               className="bg-[#4A69DD] text-white px-6 py-2 text-sm rounded-full hover:bg-[#3A539B] transition-all duration-300 flex items-center transform hover:scale-105 hover:shadow-md"
//             >
//               {selectedAvailability ? (
//                 <Edit2 className="mr-1" size={16} />
//               ) : (
//                 <Save className="mr-1" size={16} />
//               )}
//               {selectedAvailability ? "Update" : "Save"}
//             </button>
//             {selectedAvailability && (
//               <button
//                 onClick={handleDelete}
//                 className="bg-red-500 text-white px-6 py-2 text-sm rounded-full hover:bg-red-600 transition-all duration-300 flex items-center transform hover:scale-105 hover:shadow-md"
//               >
//                 <Trash2 className="mr-1" size={16} />
//                 Delete
//               </button>
//             )}
//           </div>
//           {loading && (
//             <p className="mt-4 text-center text-[#1F2B6C] text-sm animate-pulse">
//               Loading...
//             </p>
//           )}
//           {error && (
//             <p className="mt-4 text-center text-red-500 text-sm animate-bounce">
//               {error}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="max-w-3xl mx-auto mt-8">
//         <h3 className="text-2xl font-semibold text-white mb-4 flex items-center justify-center">
//           <PlusCircle className="mr-2" size={24} />
//           Scheduled Availabilities
//         </h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {availabilities && availabilities.length > 0 ? (
//             availabilities
//               .filter((availability) => !availability.is_deleted)
//               .map((availability) => (
//                 <div
//                   key={availability.available_id}
//                   className={`bg-white border-2 border-[#BFD2F8] p-4 rounded-xl cursor-pointer hover:shadow-lg transition-all duration-500 transform hover:scale-105 ${
//                     new Date(availability.available_start_date) < new Date()
//                       ? "opacity-60"
//                       : ""
//                   }`}
//                   onClick={() => {
//                     setSelectedAvailability(availability);
//                     setStartDate(new Date(availability.available_start_date));
//                     setEndDate(
//                       availability.available_end_date
//                         ? new Date(availability.available_end_date)
//                         : null
//                     );
//                     setStartTime(availability.available_start_time.slice(0, 5));
//                     setEndTime(availability.available_end_time.slice(0, 5));
//                   }}
//                 >
//                   <p className="font-medium text-[#1F2B6C] mb-2 flex items-center text-sm">
//                     <Calendar className="mr-1 text-[#4A69DD]" size={16} />
//                     {new Date(
//                       availability.available_start_date
//                     ).toLocaleDateString()}
//                     {availability.available_end_date &&
//                       ` - ${new Date(
//                         availability.available_end_date
//                       ).toLocaleDateString()}`}
//                   </p>
//                   <p className="text-xs text-[#4A69DD] flex items-center">
//                     <Clock className="mr-1" size={14} />
//                     {availability.available_start_time.slice(0, 5)} -{" "}
//                     {availability.available_end_time.slice(0, 5)}
//                   </p>
//                 </div>
//               ))
//           ) : (
//             <p className="col-span-3 text-center text-white text-sm">
//               No availabilities found.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorScheduling;

//! الديزاين المعتمد
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useNavigate } from "react-router-dom";
// import {
//   setAvailability,
//   getAvailabilities,
//   updateAvailability,
//   deleteAvailability,
// } from "../../store/doctorSchedulingSlice";
// import {
//   Calendar,
//   Clock,
//   Trash2,
//   Save,
//   Edit2,
//   PlusCircle,
//   Check,
//   X,
// } from "lucide-react";

// const DoctorScheduling = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { availabilities, loading, error } = useSelector(
//     (state) => state.doctorScheduling
//   );
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [selectedAvailability, setSelectedAvailability] = useState(null);
//   const [isFormOpen, setIsFormOpen] = useState(false);

//   useEffect(() => {
//     const fetchAvailabilities = async () => {
//       try {
//         await dispatch(getAvailabilities()).unwrap();
//       } catch (error) {
//         if (error.status === 401) {
//           navigate("/login");
//         }
//       }
//     };

//     fetchAvailabilities();
//   }, [dispatch, navigate]);

//   const formatDate = (date) => {
//     const utcDate = new Date(
//       Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
//     );
//     return utcDate.toISOString().split("T")[0];
//   };

//   const handleSave = async () => {
//     if (!startDate || !startTime || !endTime) {
//       alert("Please fill in all required fields");
//       return;
//     }

//     const availabilityData = {
//       availableStartDate: formatDate(startDate),
//       availableEndDate: endDate ? formatDate(endDate) : null,
//       startTime,
//       endTime,
//     };

//     try {
//       if (selectedAvailability) {
//         await dispatch(
//           updateAvailability({
//             availableId: selectedAvailability.available_id,
//             ...availabilityData,
//           })
//         ).unwrap();
//       } else {
//         await dispatch(setAvailability(availabilityData)).unwrap();
//       }
//       resetForm();
//       setIsFormOpen(false);
//     } catch (error) {
//       console.error("Error saving availability:", error);
//     }
//   };

//   const handleDelete = async () => {
//     if (selectedAvailability) {
//       if (
//         window.confirm("Are you sure you want to delete this availability?")
//       ) {
//         try {
//           await dispatch(
//             deleteAvailability(selectedAvailability.available_id)
//           ).unwrap();
//           resetForm();
//         } catch (error) {
//           console.error("Error deleting availability:", error);
//         }
//       }
//     }
//   };

//   const resetForm = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setStartTime("");
//     setEndTime("");
//     setSelectedAvailability(null);
//   };

//   return (
//     <div className="min-h-screen bg-white p-6 font-sans">
//       <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-lg">
//         <div className="p-6">
//           <h2 className="text-3xl font-bold text-[#1F2B6C] mb-8 text-center relative">
//             <span>Doctor's Schedule Master</span>
//             <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-[#1F2B6C]"></div>
//           </h2>

//           {!isFormOpen && (
//             <button
//               onClick={() => setIsFormOpen(true)}
//               className="w-full bg-[#1F2B6C] text-white py-3 rounded-full text-lg font-bold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-md mb-6 flex items-center justify-center"
//             >
//               <PlusCircle className="mr-2" size={20} />
//               Add New Availability
//             </button>
//           )}

//           {isFormOpen && (
//             <div className="bg-white border-2 border-[#BFD2F8] rounded-xl p-4 mb-6 transition-all duration-500 animate-fadeIn">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                 <div className="group">
//                   <label className="block text-sm font-medium text-[#1F2B6C] mb-1 transition-all duration-300 group-hover:text-opacity-80">
//                     Start Date
//                   </label>
//                   <DatePicker
//                     selected={startDate}
//                     onChange={setStartDate}
//                     minDate={new Date()}
//                     dateFormat="yyyy-MM-dd"
//                     className="w-full p-2 bg-white border-2 border-[#BFD2F8] rounded-lg focus:ring-2 focus:ring-[#1F2B6C] focus:border-transparent transition-all duration-300 hover:border-[#1F2B6C] text-[#1F2B6C] placeholder-[#1F2B6C]::placeholder"
//                   />
//                 </div>
//                 <div className="group">
//                   <label className="block text-sm font-medium text-[#1F2B6C] mb-1 transition-all duration-300 group-hover:text-opacity-80">
//                     End Date (Optional)
//                   </label>
//                   <DatePicker
//                     selected={endDate}
//                     onChange={setEndDate}
//                     minDate={startDate || new Date()}
//                     dateFormat="yyyy-MM-dd"
//                     className="w-full p-2 bg-white border-2 border-[#BFD2F8] rounded-lg focus:ring-2 focus:ring-[#1F2B6C] focus:border-transparent transition-all duration-300 hover:border-[#1F2B6C] text-[#1F2B6C] placeholder-[#1F2B6C]::placeholder"
//                   />
//                 </div>
//                 <div className="group">
//                   <label className="block text-sm font-medium text-[#1F2B6C] mb-1 transition-all duration-300 group-hover:text-opacity-80">
//                     Start Time
//                   </label>
//                   <input
//                     type="time"
//                     value={startTime}
//                     onChange={(e) => setStartTime(e.target.value)}
//                     className="w-full p-2 bg-white border-2 border-[#BFD2F8] rounded-lg focus:ring-2 focus:ring-[#1F2B6C] focus:border-transparent transition-all duration-300 hover:border-[#1F2B6C] text-[#1F2B6C] placeholder-[#1F2B6C]::placeholder"
//                   />
//                 </div>
//                 <div className="group">
//                   <label className="block text-sm font-medium text-[#1F2B6C] mb-1 transition-all duration-300 group-hover:text-opacity-80">
//                     End Time
//                   </label>
//                   <input
//                     type="time"
//                     value={endTime}
//                     onChange={(e) => setEndTime(e.target.value)}
//                     className="w-full p-2 bg-white border-2 border-[#BFD2F8] rounded-lg focus:ring-2 focus:ring-[#1F2B6C] focus:border-transparent transition-all duration-300 hover:border-[#1F2B6C] text-[#1F2B6C] placeholder-[#1F2B6C]::placeholder"
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-center space-x-3">
//                 <button
//                   onClick={handleSave}
//                   className="bg-[#1F2B6C] text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 flex items-center transform hover:scale-105 hover:shadow-md text-sm"
//                 >
//                   {selectedAvailability ? (
//                     <Edit2 className="mr-1" size={16} />
//                   ) : (
//                     <Save className="mr-1" size={16} />
//                   )}
//                   {selectedAvailability ? "Update" : "Save"}
//                 </button>
//                 {selectedAvailability && (
//                   <button
//                     onClick={handleDelete}
//                     className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 flex items-center transform hover:scale-105 hover:shadow-md text-sm"
//                   >
//                     <Trash2 className="mr-1" size={16} />
//                     Delete
//                   </button>
//                 )}
//                 <button
//                   onClick={() => {
//                     resetForm();
//                     setIsFormOpen(false);
//                   }}
//                   className="bg-gray-400 text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 flex items-center transform hover:scale-105 hover:shadow-md text-sm"
//                 >
//                   <X className="mr-1" size={16} />
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           )}

//           {loading && (
//             <div className="flex justify-center items-center space-x-2 my-6">
//               <div className="w-3 h-3 bg-[#1F2B6C] rounded-full animate-bounce"></div>
//               <div className="w-3 h-3 bg-[#1F2B6C] rounded-full animate-bounce200"></div>
//               <div className="w-3 h-3 bg-[#1F2B6C] rounded-full animate-bounce400"></div>
//             </div>
//           )}
//           {error && (
//             <p className="mt-4 text-center text-red-600 bg-red-100 rounded-lg p-3 animate-pulse">
//               {error}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="max-w-5xl mx-auto mt-8">
//         <h3 className="text-2xl font-bold text-[#1F2B6C] mb-6 text-center">
//           Your Scheduled Availabilities
//         </h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {availabilities && availabilities.length > 0 ? (
//             availabilities
//               .filter((availability) => !availability.is_deleted)
//               .map((availability) => (
//                 <div
//                   key={availability.available_id}
//                   className="bg-white border-2 border-[#BFD2F8] p-4 rounded-xl cursor-pointer hover:shadow-md transition-all duration-500 transform hover:scale-105 group"
//                   onClick={() => {
//                     setSelectedAvailability(availability);
//                     setStartDate(new Date(availability.available_start_date));
//                     setEndDate(
//                       availability.available_end_date
//                         ? new Date(availability.available_end_date)
//                         : null
//                     );
//                     setStartTime(availability.available_start_time.slice(0, 5));
//                     setEndTime(availability.available_end_time.slice(0, 5));
//                     setIsFormOpen(true);
//                   }}
//                 >
//                   <div className="flex justify-between items-start mb-3">
//                     <div className="flex items-center">
//                       <Calendar
//                         className="mr-2 text-[#1F2B6C] group-hover:text-opacity-80 transition-all duration-300"
//                         size={20}
//                       />
//                       <p className="font-medium text-[#1F2B6C] text-base">
//                         {new Date(
//                           availability.available_start_date
//                         ).toLocaleDateString()}
//                       </p>
//                     </div>
//                     <span className="bg-[#1F2B6C] text-white text-xs font-bold px-2 py-1 rounded-full">
//                       Active
//                     </span>
//                   </div>
//                   {availability.available_end_date && (
//                     <p className="text-[#1F2B6C] text-opacity-70 mb-2 text-sm">
//                       To:{" "}
//                       {new Date(
//                         availability.available_end_date
//                       ).toLocaleDateString()}
//                     </p>
//                   )}
//                   <div className="flex items-center mt-3">
//                     <Clock
//                       className="mr-2 text-[#1F2B6C] group-hover:text-opacity-80 transition-all duration-300"
//                       size={16}
//                     />
//                     <p className="text-[#1F2B6C] text-sm">
//                       {availability.available_start_time.slice(0, 5)} -{" "}
//                       {availability.available_end_time.slice(0, 5)}
//                     </p>
//                   </div>
//                   <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <Edit2 className="text-[#1F2B6C]" size={14} />
//                   </div>
//                 </div>
//               ))
//           ) : (
//             <p className="col-span-3 text-center text-[#1F2B6C] text-lg bg-[#BFD2F8] bg-opacity-30 rounded-lg p-6 animate-pulse">
//               No availabilities found. Add your first availability now!
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorScheduling;

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
} from "../../store/doctorSchedulingSlice";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { availabilities, loading, error } = useSelector(
    (state) => state.doctorScheduling
  );
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchAvailabilities = async () => {
      try {
        await dispatch(getAvailabilities()).unwrap();
      } catch (error) {
        if (error.status === 401) {
          navigate("/login");
        }
      }
    };

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
