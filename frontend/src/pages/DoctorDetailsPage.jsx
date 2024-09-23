// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import AppointmentForm from "./AppointmentForm";
// import CommentSection from "./CommentSection";
// import Swal from "sweetalert2";

// const ContactDoctorModal = ({ isOpen, onClose, doctor }) => {
//   const [message, setMessage] = useState("");

//   const handleSend = useCallback(async () => {
//     try {
//       await axios.post("http://localhost:5000/api/contact-doctor", {
//         doctorId: doctor.staff_id,
//         message: message,
//       });
//       onClose();
//       Swal.fire({
//         title: "Success!",
//         text: "Your message has been sent successfully.",
//         icon: "success",
//         confirmButtonText: "OK",
//       });
//     } catch (error) {
//       console.error("Error sending message:", error);
//       Swal.fire({
//         title: "Error!",
//         text: "An error occurred while sending your message. Please try again.",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     }
//   }, [doctor.staff_id, message, onClose]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
//         <h3 className="text-2xl font-semibold mb-4">
//           Contact Dr. {doctor.staff_name}
//         </h3>
//         <p className="mb-4">Email: {doctor.email}</p>
//         <textarea
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded mb-4"
//           rows="5"
//           placeholder="Write your message here..."
//         />
//         <div className="flex justify-end space-x-2">
//           <button
//             onClick={handleSend}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Send
//           </button>
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const DoctorProfilePage = () => {
//   const [doctor, setDoctor] = useState(null);
//   const [showAppointmentForm, setShowAppointmentForm] = useState(false);
//   const [showContactModal, setShowContactModal] = useState(false);
//   const [comments, setComments] = useState([]);
//   const { id } = useParams();
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const location = useLocation();
//   const commentSectionRef = useRef(null);

//   useEffect(() => {
//     fetchDoctor();
//     fetchComments();
//     fetchCurrentUser();
//   }, [id]);

//   useEffect(() => {
//     if (
//       location.state &&
//       location.state.commentId &&
//       commentSectionRef.current
//     ) {
//       const commentElement = document.getElementById(
//         `comment-${location.state.commentId}`
//       );
//       if (commentElement) {
//         commentElement.scrollIntoView({ behavior: "smooth", block: "center" });
//         commentElement.classList.add("highlight-comment");
//       }
//     }
//   }, [location, comments]);

//   const fetchDoctor = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/doctors/${id}`);
//       const data = await response.json();
//       setDoctor(data);
//     } catch (error) {
//       console.error("Error fetching doctor:", error);
//     }
//   };

//   const fetchComments = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/comment/doctors/${id}/comments`
//       );
//       setComments(response.data);
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//     }
//   };

//   const fetchCurrentUser = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/patients/profile",
//         { withCredentials: true }
//       );
//       setCurrentUserId(response.data.id);
//     } catch (error) {
//       console.error("Error fetching current user:", error);
//     }
//   };

//   const addComment = async (commentText, parentCommentId = null) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/comment/doctors/comments",
//         {
//           doctor_id: id,
//           parent_comment_id: parentCommentId,
//           comment_text: commentText,
//         },
//         {
//           withCredentials: true,
//         }
//       );
//       setComments([response.data, ...comments]);
//     } catch (error) {
//       console.error("Error adding comment:", error);
//       Swal.fire({
//         title: "Error!",
//         text: "An error occurred while adding your comment. Please try again.",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     }
//   };

//   const updateComment = async (commentId, newText) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/comment/doctors/comments/${commentId}`,
//         {
//           comment_text: newText,
//         },
//         {
//           withCredentials: true,
//         }
//       );
//       setComments(
//         comments.map((comment) =>
//           comment.comment_id === commentId
//             ? { ...comment, comment_text: newText }
//             : comment
//         )
//       );
//     } catch (error) {
//       console.error("Error updating comment:", error);
//       Swal.fire({
//         title: "Error!",
//         text: "An error occurred while updating your comment. Please try again.",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     }
//   };

//   const deleteComment = async (commentId) => {
//     try {
//       await axios.delete(
//         `http://localhost:5000/api/comment/doctors/comments/${commentId}`,
//         {
//           withCredentials: true,
//         }
//       );
//       setComments(
//         comments.filter((comment) => comment.comment_id !== commentId)
//       );
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//       Swal.fire({
//         title: "Error!",
//         text: "An error occurred while deleting your comment. Please try again.",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     }
//   };

//   if (!doctor) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="bg-gray-100 flex flex-col min-h-screen">
//       <Navbar />
//       <div className="flex-grow py-10">
//         <div className="container mx-auto px-4">
//           <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//             <div className="md:flex">
//               <div className="md:flex-shrink-0">
//                 <img
//                   className="h-48 w-full object-cover md:w-48"
//                   src={
//                     `http://localhost:5000/${doctor.profile_image}` ||
//                     "https://via.placeholder.com/150"
//                   }
//                   alt={doctor.staff_name}
//                 />
//               </div>
//               <div className="p-8">
//                 <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                   {doctor.staff_name}
//                 </h1>
//                 <h2 className="text-xl text-gray-600 mb-4">
//                   {doctor.specialty}
//                 </h2>
//                 <p className="text-gray-700 mb-4">{doctor.bio}</p>
//                 <div className="flex space-x-4">
//                   <button
//                     onClick={() => setShowContactModal(true)}
//                     className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                   >
//                     Contact Doctor
//                   </button>
//                   <button
//                     onClick={() => setShowAppointmentForm(true)}
//                     className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                   >
//                     Book an Appointment
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {showAppointmentForm && (
//             <AppointmentForm
//               doctor={doctor}
//               onClose={() => setShowAppointmentForm(false)}
//             />
//           )}
//           <ContactDoctorModal
//             isOpen={showContactModal}
//             onClose={() => setShowContactModal(false)}
//             doctor={doctor}
//           />
//           <div ref={commentSectionRef}>
//             <CommentSection
//               comments={comments}
//               addComment={addComment}
//               updateComment={updateComment}
//               deleteComment={deleteComment}
//               currentUserId={currentUserId}
//             />
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default DoctorProfilePage;



// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import AppointmentForm from "./AppointmentForm";
// import CommentSection from "./CommentSection";
// import Swal from "sweetalert2";
// import { motion } from "framer-motion";
// import {
//   FaUserMd,
//   FaEnvelope,
//   FaCalendarAlt,
//   FaComments,
// } from "react-icons/fa";

// const ContactDoctorModal = ({ isOpen, onClose, doctor }) => {
//   const [message, setMessage] = useState("");

//   const handleSend = useCallback(async () => {
//     try {
//       await axios.post("http://localhost:5000/api/contact-doctor", {
//         doctorId: doctor.staff_id,
//         message: message,
//       });
//       onClose();
//       Swal.fire({
//         title: "Message Sent!",
//         text: "Your message has been delivered successfully.",
//         icon: "success",
//         confirmButtonText: "OK",
//         customClass: {
//           popup: "bg-[#e6f0f5] rounded-lg",
//           title: "text-[#04333a] text-xl font-bold",
//           content: "text-[#04333a]",
//           confirmButton:
//             "bg-[#04333a] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300",
//         },
//       });
//     } catch (error) {
//       console.error("Error sending message:", error);
//       Swal.fire({
//         title: "Oops!",
//         text: "We couldn't send your message. Please try again.",
//         icon: "error",
//         confirmButtonText: "OK",
//         customClass: {
//           popup: "bg-[#e6f0f5] rounded-lg",
//           title: "text-[#04333a] text-xl font-bold",
//           content: "text-[#04333a]",
//           confirmButton:
//             "bg-[#04333a] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300",
//         },
//       });
//     }
//   }, [doctor.staff_id, message, onClose]);

//   if (!isOpen) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
//     >
//       <motion.div
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         className="bg-[#e6f0f5] p-8 rounded-lg shadow-lg max-w-lg w-full"
//       >
//         <h3 className="text-2xl font-semibold mb-4 text-[#04333a]">
//           Contact Dr. {doctor.staff_name}
//         </h3>
//         <p className="mb-4 text-[#04333a] flex items-center">
//           <FaEnvelope className="mr-2" /> {doctor.email}
//         </p>
//         <textarea
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="w-full p-2 border border-[#04333a] rounded mb-4 bg-white focus:ring-2 focus:ring-[#04333a] focus:outline-none transition-all duration-300"
//           rows="5"
//           placeholder="Write your message here..."
//         />
//         <div className="flex justify-end space-x-2">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleSend}
//             className="px-4 py-2 bg-[#04333a] text-white rounded hover:bg-opacity-90 transition-all duration-300"
//           >
//             Send
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-300 text-[#04333a] rounded hover:bg-gray-400 transition-all duration-300"
//           >
//             Cancel
//           </motion.button>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// const DoctorProfilePage = () => {
//   const [doctor, setDoctor] = useState(null);
//   const [showAppointmentForm, setShowAppointmentForm] = useState(false);
//   const [showContactModal, setShowContactModal] = useState(false);
//   const [comments, setComments] = useState([]);
//   const { id } = useParams();
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const location = useLocation();
//   const commentSectionRef = useRef(null);

//   useEffect(() => {
//     fetchDoctor();
//     fetchComments();
//     fetchCurrentUser();
//   }, [id]);

//   useEffect(() => {
//     if (
//       location.state &&
//       location.state.commentId &&
//       commentSectionRef.current
//     ) {
//       const commentElement = document.getElementById(
//         `comment-${location.state.commentId}`
//       );
//       if (commentElement) {
//         commentElement.scrollIntoView({ behavior: "smooth", block: "center" });
//         commentElement.classList.add("highlight-comment");
//       }
//     }
//   }, [location, comments]);

//   const fetchDoctor = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/doctors/${id}`);
//       const data = await response.json();
//       setDoctor(data);
//     } catch (error) {
//       console.error("Error fetching doctor:", error);
//     }
//   };

//   const fetchComments = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/comment/doctors/${id}/comments`
//       );
//       setComments(response.data);
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//     }
//   };

//   const fetchCurrentUser = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/patients/profile",
//         { withCredentials: true }
//       );
//       setCurrentUserId(response.data.id);
//     } catch (error) {
//       console.error("Error fetching current user:", error);
//     }
//   };

//   const addComment = async (commentText, parentCommentId = null) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/comment/doctors/comments",
//         {
//           doctor_id: id,
//           parent_comment_id: parentCommentId,
//           comment_text: commentText,
//         },
//         {
//           withCredentials: true,
//         }
//       );
//       setComments([response.data, ...comments]);
//     } catch (error) {
//       console.error("Error adding comment:", error);
//       Swal.fire({
//         title: "Oops!",
//         text: "We couldn't add your comment. Please try again.",
//         icon: "error",
//         confirmButtonText: "OK",
//         customClass: {
//           popup: "bg-[#e6f0f5] rounded-lg",
//           title: "text-[#04333a] text-xl font-bold",
//           content: "text-[#04333a]",
//           confirmButton:
//             "bg-[#04333a] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300",
//         },
//       });
//     }
//   };

//   const updateComment = async (commentId, newText) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/comment/doctors/comments/${commentId}`,
//         {
//           comment_text: newText,
//         },
//         {
//           withCredentials: true,
//         }
//       );
//       setComments(
//         comments.map((comment) =>
//           comment.comment_id === commentId
//             ? { ...comment, comment_text: newText }
//             : comment
//         )
//       );
//     } catch (error) {
//       console.error("Error updating comment:", error);
//       Swal.fire({
//         title: "Oops!",
//         text: "We couldn't update your comment. Please try again.",
//         icon: "error",
//         confirmButtonText: "OK",
//         customClass: {
//           popup: "bg-[#e6f0f5] rounded-lg",
//           title: "text-[#04333a] text-xl font-bold",
//           content: "text-[#04333a]",
//           confirmButton:
//             "bg-[#04333a] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300",
//         },
//       });
//     }
//   };

//   const deleteComment = async (commentId) => {
//     try {
//       await axios.delete(
//         `http://localhost:5000/api/comment/doctors/comments/${commentId}`,
//         {
//           withCredentials: true,
//         }
//       );
//       setComments(
//         comments.filter((comment) => comment.comment_id !== commentId)
//       );
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//       Swal.fire({
//         title: "Oops!",
//         text: "We couldn't delete your comment. Please try again.",
//         icon: "error",
//         confirmButtonText: "OK",
//         customClass: {
//           popup: "bg-[#e6f0f5] rounded-lg",
//           title: "text-[#04333a] text-xl font-bold",
//           content: "text-[#04333a]",
//           confirmButton:
//             "bg-[#04333a] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300",
//         },
//       });
//     }
//   };

//   if (!doctor) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-[#f6f5f2]">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#04333a]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#f6f5f2] flex flex-col min-h-screen">
//       <Navbar />
//       <div className="flex-grow py-10">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white rounded-lg shadow-lg overflow-hidden"
//           >
//             <div className="md:flex">
//               <div className="md:flex-shrink-0">
//                 <img
//                   className="h-48 w-full object-cover md:w-48 transition-transform duration-300 hover:scale-105"
//                   src={
//                     `http://localhost:5000/${doctor.profile_image}` ||
//                     "https://via.placeholder.com/150"
//                   }
//                   alt={doctor.staff_name}
//                 />
//               </div>
//               <div className="p-8">
//                 <h1 className="text-3xl font-bold text-[#04333a] mb-2 flex items-center">
//                   <FaUserMd className="mr-2" /> Dr. {doctor.staff_name}
//                 </h1>
//                 <h2 className="text-xl text-[#04333a] mb-4">
//                   {doctor.specialty}
//                 </h2>
//                 <p className="text-[#04333a] mb-4">{doctor.bio}</p>
//                 <div className="flex space-x-4">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setShowContactModal(true)}
//                     className="inline-block bg-[#04333a] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300 flex items-center"
//                   >
//                     <FaEnvelope className="mr-2" /> Contact Doctor
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setShowAppointmentForm(true)}
//                     className="inline-block bg-[#e6f0f5] text-[#04333a] px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300 flex items-center"
//                   >
//                     <FaCalendarAlt className="mr-2" /> Book an Appointment
//                   </motion.button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//           {showAppointmentForm && (
//             <AppointmentForm
//               doctor={doctor}
//               onClose={() => setShowAppointmentForm(false)}
//             />
//           )}
//           <ContactDoctorModal
//             isOpen={showContactModal}
//             onClose={() => setShowContactModal(false)}
//             doctor={doctor}
//           />
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             ref={commentSectionRef}
//             className="mt-8"
//           >
//             <h2 className="text-2xl font-bold text-[#04333a] mb-4 flex items-center">
//               <FaComments className="mr-2" /> Comments
//             </h2>
//             <CommentSection
//               comments={comments}
//               addComment={addComment}
//               updateComment={updateComment}
//               deleteComment={deleteComment}
//               currentUserId={currentUserId}
//             />
//           </motion.div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default DoctorProfilePage;



import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AppointmentForm from "./AppointmentForm";
import CommentSection from "./CommentSection";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserMd, FaEnvelope, FaCalendarAlt, FaComments, FaStethoscope, FaHospital, FaNotesMedical } from "react-icons/fa";

const ContactDoctorModal = ({ isOpen, onClose, doctor }) => {
  const [message, setMessage] = useState("");

  const handleSend = useCallback(async () => {
    try {
      await axios.post("http://localhost:5000/api/contact-doctor", {
        doctorId: doctor.staff_id,
        message: message,
      });
      onClose();
      Swal.fire({
        title: "Message Sent!",
        text: "Your message has been delivered successfully.",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          popup: "bg-[#e6f0f5] rounded-lg shadow-xl border border-[#04333a] max-w-md",
          title: "text-[#04333a] text-xl font-bold",
          content: "text-[#04333a]",
          confirmButton: "bg-[#04333a] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300",
        },
      });
    } catch (error) {
      console.error("Error sending message:", error);
      Swal.fire({
        title: "Oops!",
        text: "We couldn't send your message. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          popup: "bg-[#e6f0f5] rounded-lg shadow-xl border border-[#04333a] max-w-md",
          title: "text-[#04333a] text-xl font-bold",
          content: "text-[#04333a]",
          confirmButton: "bg-[#04333a] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300",
        },
      });
    }
  }, [doctor.staff_id, message, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="bg-[#e6f0f5] p-8 rounded-lg shadow-2xl max-w-lg w-full border-2 border-[#04333a]"
          >
            <h3 className="text-2xl font-semibold mb-4 text-[#04333a] flex items-center">
              <FaUserMd className="mr-2" /> Contact Dr. {doctor.staff_name}
            </h3>
            <p className="mb-4 text-[#04333a] flex items-center">
              <FaEnvelope className="mr-2" /> {doctor.email}
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border-2 border-[#04333a] rounded-lg mb-4 bg-white focus:ring-2 focus:ring-[#04333a] focus:outline-none transition-all duration-300 resize-none"
              rows="5"
              placeholder="Write your message here..."
            />
            <div className="flex justify-end space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                className="px-6 py-2 bg-[#04333a] text-white rounded-full hover:bg-opacity-90 transition-all duration-300 flex items-center"
              >
                <FaEnvelope className="mr-2" /> Send
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-6 py-2 bg-gray-300 text-[#04333a] rounded-full hover:bg-gray-400 transition-all duration-300 flex items-center"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DoctorProfilePage = () => {
  const [doctor, setDoctor] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const [currentUserId, setCurrentUserId] = useState(null);
  const location = useLocation();
  const commentSectionRef = useRef(null);

  useEffect(() => {
    fetchDoctor();
    fetchComments();
    fetchCurrentUser();
  }, [id]);

  useEffect(() => {
    if (
      location.state &&
      location.state.commentId &&
      commentSectionRef.current
    ) {
      const commentElement = document.getElementById(
        `comment-${location.state.commentId}`
      );
      if (commentElement) {
        commentElement.scrollIntoView({ behavior: "smooth", block: "center" });
        commentElement.classList.add("highlight-comment");
      }
    }
  }, [location, comments]);

  const fetchDoctor = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/doctors/${id}`);
      const data = await response.json();
      setDoctor(data);
    } catch (error) {
      console.error("Error fetching doctor:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/comment/doctors/${id}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/patients/profile",
        { withCredentials: true }
      );
      setCurrentUserId(response.data.id);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const addComment = async (commentText, parentCommentId = null) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/comment/doctors/comments",
        {
          doctor_id: id,
          parent_comment_id: parentCommentId,
          comment_text: commentText,
        },
        {
          withCredentials: true,
        }
      );
      setComments([response.data, ...comments]);
    } catch (error) {
      console.error("Error adding comment:", error);
      Swal.fire({
        title: "Oops!",
        text: "We couldn't add your comment. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          popup:
            "bg-[#e6f0f5] rounded-lg shadow-xl border border-[#04333a] max-w-md",
          title: "text-[#04333a] text-xl font-bold",
          content: "text-[#04333a]",
          confirmButton:
            "bg-[#04333a] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300",
        },
      });
    }
  };

  const updateComment = async (commentId, newText) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/comment/doctors/comments/${commentId}`,
        {
          comment_text: newText,
        },
        {
          withCredentials: true,
        }
      );
      setComments(
        comments.map((comment) =>
          comment.comment_id === commentId
            ? { ...comment, comment_text: newText }
            : comment
        )
      );
    } catch (error) {
      console.error("Error updating comment:", error);
      Swal.fire({
        title: "Oops!",
        text: "We couldn't update your comment. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          popup:
            "bg-[#e6f0f5] rounded-lg shadow-xl border border-[#04333a] max-w-md",
          title: "text-[#04333a] text-xl font-bold",
          content: "text-[#04333a]",
          confirmButton:
            "bg-[#04333a] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300",
        },
      });
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/comment/doctors/comments/${commentId}`,
        {
          withCredentials: true,
        }
      );
      setComments(
        comments.filter((comment) => comment.comment_id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
      Swal.fire({
        title: "Oops!",
        text: "We couldn't delete your comment. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          popup:
            "bg-[#e6f0f5] rounded-lg shadow-xl border border-[#04333a] max-w-md",
          title: "text-[#04333a] text-xl font-bold",
          content: "text-[#04333a]",
          confirmButton:
            "bg-[#04333a] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300",
        },
      });
    }
  };

  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f6f5f2]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#04333a]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f5f2] flex flex-col min-h-screen font-serif">
      <Navbar />
      <div className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-10"
          >
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-56 w-full object-cover md:w-56 transition-transform duration-300 hover:scale-105"
                  src={
                    `http://localhost:5000/${doctor.profile_image}` ||
                    "https://via.placeholder.com/150"
                  }
                  alt={doctor.staff_name}
                />
              </div>
              <div className="p-8">
                <h1 className="text-4xl font-bold text-[#04333a] mb-4 flex items-center">
                  <FaUserMd className="mr-3 text-[#04333a]" /> Dr.{" "}
                  {doctor.staff_name}
                </h1>
                <h2 className="text-2xl text-[#04333a] mb-4 flex items-center">
                  <FaStethoscope className="mr-2 text-[#04333a]" />{" "}
                  {doctor.specialty}
                </h2>
                <p className="text-[#04333a] mb-6 italic">{doctor.bio}</p>
                <div className="flex flex-wrap space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowContactModal(true)}
                    className="mb-2 inline-block bg-[#04333a] text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 flex items-center shadow-lg"
                  >
                    <FaEnvelope className="mr-2" /> Contact Doctor
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAppointmentForm(true)}
                    className="mb-2 inline-block bg-[#e6f0f5] text-[#04333a] px-6 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 flex items-center shadow-lg"
                  >
                    <FaCalendarAlt className="mr-2" /> Book an Appointment
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
          {showAppointmentForm && (
            <AppointmentForm
              doctor={doctor}
              onClose={() => setShowAppointmentForm(false)}
            />
          )}
          <ContactDoctorModal
            isOpen={showContactModal}
            onClose={() => setShowContactModal(false)}
            doctor={doctor}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            ref={commentSectionRef}
            className="mt-8 bg-white rounded-2xl shadow-2xl p-8"
          >
            {/* <h2 className="text-3xl font-bold text-[#04333a] mb-6 flex items-center">
              <FaComments className="mr-3 text-[#04333a]" /> Patient Feedback
            </h2> */}
            <CommentSection
              comments={comments}
              addComment={addComment}
              updateComment={updateComment}
              deleteComment={deleteComment}
              currentUserId={currentUserId}
            />
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorProfilePage;