// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { PayPalButtons } from "@paypal/react-paypal-js";
// import axios from "axios";

// const AppointmentForm = ({ doctor, onClose }) => {
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState("");
//   const [showPayPal, setShowPayPal] = useState(false);
//   const [appointmentId, setAppointmentId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchAvailableSlots();
//   }, [doctor.staff_id]);

//   const fetchAvailableSlots = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/appointment/doctors/${doctor.staff_id}/available-slots`,
//         {
//           withCredentials: true,
//         }
//       );
//       setAvailableSlots(response.data);
//     } catch (error) {
//       console.error("Error fetching available slots:", error);
//       if (error.response && error.response.status === 401) {
//         navigate("/login");
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/appointment/appointments",
//         {
//           available_id: selectedSlot,
//         },
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.data.appointment_id) {
//         setAppointmentId(response.data.appointment_id);
//         setShowPayPal(true);
//       } else {
//         throw new Error("No appointment ID received");
//       }
//     } catch (error) {
//       console.error("Error booking appointment:", error);
//       if (error.response && error.response.status === 401) {
//         navigate("/login");
//       } else {
//         Swal.fire({
//           title: "Error!",
//           text:
//             error.response?.data?.message ||
//             "Failed to book appointment. Please try again.",
//           icon: "error",
//           confirmButtonText: "OK",
//         });
//       }
//     }
//   };

//   const createOrder = async (data, actions) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/payments/create-order",
//         {
//           amount: "20",
//           appointmentId: appointmentId,
//         },
//         {
//           withCredentials: true,
//         }
//       );
//       return response.data.id;
//     } catch (error) {
//       console.error("Error creating PayPal order:", error);
//       Swal.fire({
//         title: "Error!",
//         text: "Failed to create order. Please try again.",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//       throw error;
//     }
//   };

//   const onApprove = async (data, actions) => {
//     try {
//       console.log("Sending capture request with:", {
//         orderId: data.orderID,
//         appointmentId,
//       });
//       const response = await axios.post(
//         "http://localhost:5000/api/payments/capture-order",
//         {
//           orderId: data.orderID,
//           appointmentId: appointmentId,
//         },
//         {
//           withCredentials: true,
//         }
//       );
//       console.log("Capture response:", response.data);

//       if (response.data.status === "COMPLETED") {
//         Swal.fire({
//           title: "Success!",
//           text: "Appointment booked and payment completed successfully!",
//           icon: "success",
//           confirmButtonText: "OK",
//         }).then(() => {
//           onClose();
//         });
//       } else {
//         throw new Error(`Transaction failed: ${response.data.status}`);
//       }
//     } catch (error) {
//       console.error("Error capturing PayPal order:", error);
//       if (error.response) {
//         console.error("Server responded with:", error.response.data);
//       }
//       Swal.fire({
//         title: "Error!",
//         text: "There was an issue processing your payment. Please try again.",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     }
//   };
//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
//       <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//         <h3 className="text-lg font-bold mb-4">
//           Book an Appointment with {doctor.staff_name}
//         </h3>
//         {!showPayPal ? (
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label
//                 className="block text-gray-700 text-sm font-bold mb-2"
//                 htmlFor="slot"
//               >
//                 Available Slots
//               </label>
//               <select
//                 id="slot"
//                 value={selectedSlot}
//                 onChange={(e) => setSelectedSlot(e.target.value)}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 required
//               >
//                 <option value="">Select a slot</option>
//                 {availableSlots.map((slot) => (
//                   <option key={slot.available_id} value={slot.available_id}>
//                     {new Date(slot.available_start_date).toLocaleDateString()}{" "}
//                     {slot.available_start_time} - {slot.available_end_time}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex items-center justify-between">
//               <button
//                 type="submit"
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               >
//                 Book Appointment
//               </button>
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         ) : (
//           <div>
//             <p className="mb-4">
//               Please complete the payment to confirm your appointment.
//             </p>
//             <PayPalButtons
//               createOrder={createOrder}
//               onApprove={onApprove}
//               style={{ layout: "vertical" }}
//             />
//             <button
//               onClick={onClose}
//               className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Cancel
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AppointmentForm;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { motion } from "framer-motion";
import { Stethoscope, Calendar, DollarSign, X } from "lucide-react";

const AppointmentForm = ({ doctor, onClose }) => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [showPayPal, setShowPayPal] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAvailableSlots();
  }, [doctor.staff_id]);

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/appointment/doctors/${doctor.staff_id}/available-slots`,
        {
          withCredentials: true,
        }
      );
      setAvailableSlots(response.data);
    } catch (error) {
      console.error("Error fetching available slots:", error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/appointment/appointments",
        {
          available_id: selectedSlot,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.appointment_id) {
        setAppointmentId(response.data.appointment_id);
        setShowPayPal(true);
      } else {
        throw new Error("No appointment ID received");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        // Custom styled alert
        const alertElement = document.createElement("div");
        alertElement.innerHTML = `
          <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 max-w-sm mx-auto">
              <h2 class="text-xl font-bold mb-4 text-red-600">Error!</h2>
              <p class="mb-4">${
                error.response?.data?.message ||
                "Failed to book appointment. Please try again."
              }</p>
              <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">OK</button>
            </div>
          </div>
        `;
        document.body.appendChild(alertElement);
        alertElement.querySelector("button").onclick = () =>
          alertElement.remove();
      }
    }
  };

  const createOrder = async (data, actions) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/payments/create-order",
        {
          amount: "20",
          appointmentId: appointmentId,
        },
        {
          withCredentials: true,
        }
      );
      return response.data.id;
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      // Custom styled alert
      const alertElement = document.createElement("div");
      alertElement.innerHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 max-w-sm mx-auto">
            <h2 class="text-xl font-bold mb-4 text-red-600">Error!</h2>
            <p class="mb-4">Failed to create order. Please try again.</p>
            <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">OK</button>
          </div>
        </div>
      `;
      document.body.appendChild(alertElement);
      alertElement.querySelector("button").onclick = () =>
        alertElement.remove();
      throw error;
    }
  };

  const onApprove = async (data, actions) => {
    try {
      console.log("Sending capture request with:", {
        orderId: data.orderID,
        appointmentId,
      });
      const response = await axios.post(
        "http://localhost:5000/api/payments/capture-order",
        {
          orderId: data.orderID,
          appointmentId: appointmentId,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Capture response:", response.data);

      if (response.data.status === "COMPLETED") {
        // Custom styled alert
        const alertElement = document.createElement("div");
        alertElement.innerHTML = `
          <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 max-w-sm mx-auto">
              <h2 class="text-xl font-bold mb-4 text-green-600">Success!</h2>
              <p class="mb-4">Appointment booked and payment completed successfully!</p>
              <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">OK</button>
            </div>
          </div>
        `;
        document.body.appendChild(alertElement);
        alertElement.querySelector("button").onclick = () => {
          alertElement.remove();
          onClose();
        };
      } else {
        throw new Error(`Transaction failed: ${response.data.status}`);
      }
    } catch (error) {
      console.error("Error capturing PayPal order:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
      // Custom styled alert
      const alertElement = document.createElement("div");
      alertElement.innerHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 max-w-sm mx-auto">
            <h2 class="text-xl font-bold mb-4 text-red-600">Error!</h2>
            <p class="mb-4">There was an issue processing your payment. Please try again.</p>
            <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">OK</button>
          </div>
        </div>
      `;
      document.body.appendChild(alertElement);
      alertElement.querySelector("button").onclick = () =>
        alertElement.remove();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#04333a] bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative p-8 border w-full max-w-md shadow-lg rounded-2xl bg-[#f6f5f2]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-300"
        >
          <X size={24} />
        </button>
        <h3 className="text-2xl font-bold mb-6 text-[#04333a] flex items-center">
          <Stethoscope className="mr-2" size={28} />
          Book with Dr. {doctor.staff_name}
        </h3>
        {!showPayPal ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="block text-[#04333a] text-sm font-semibold mb-2"
                htmlFor="slot"
              >
                <Calendar className="inline-block mr-2" size={20} />
                Available Slots
              </label>
              <select
                id="slot"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#04333a] focus:border-transparent transition duration-300"
                required
              >
                <option value="">Select a slot</option>
                {availableSlots.map((slot) => (
                  <option key={slot.available_id} value={slot.available_id}>
                    {new Date(slot.available_start_date).toLocaleDateString()}{" "}
                    {slot.available_start_time} - {slot.available_end_time}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="flex-1 bg-[#04333a] hover:bg-[#054955] text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
              >
                Book Appointment
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <p className="text-[#04333a] mb-4">
              Please complete the payment to confirm your appointment.
            </p>
            <div className="p-4 bg-[#e6f0f5] rounded-lg shadow-inner">
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                style={{ layout: "vertical", color: "blue" }}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
            >
              Cancel
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AppointmentForm;