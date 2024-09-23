
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import { Download, Calendar, User } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// // Configure Axios to send credentials with every request
// axios.defaults.withCredentials = true;

// const PrescriptionCard = ({ prescription, patientName, onDownload }) => (
//   <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
//     <div className="bg-blue-500 text-white px-6 py-4">
//       <h2 className="text-xl font-semibold">Prescription from Dr. {prescription.doctor_name}</h2>
//     </div>
//     <div className="p-6">
//       <div className="mb-4">
//         <div className="flex items-center mb-2">
//           <Calendar className="w-5 h-5 mr-2 text-gray-500" />
//           <span className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</span>
//         </div>
//         <div className="flex items-center">
//           <User className="w-5 h-5 mr-2 text-gray-500" />
//           <span className="text-sm text-gray-600">Patient: {patientName}</span>
//         </div>
//       </div>
//       <div className="mb-4">
//         <h3 className="font-semibold mb-2">Diagnosis:</h3>
//         <p className="text-gray-700">{prescription.diagnosis}</p>
//       </div>
//       <div className="mb-4">
//         <h3 className="font-semibold mb-2">Medications:</h3>
//         <p className="text-gray-700">{prescription.drugs}</p>
//       </div>
//       <div className="mb-6">
//         <h3 className="font-semibold mb-2">Treatment Plan:</h3>
//         <p className="text-gray-700">{prescription.treatment_plan}</p>
//       </div>
//       <button
//         className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
//         onClick={onDownload}
//       >
//         <Download className="w-5 h-5 mr-2" />
//         Download PDF
//       </button>
//     </div>
//   </div>
// );

// export default function MyPrescriptionPage() {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [patientName, setPatientName] = useState('');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUserProfile();
//     fetchPrescriptions();
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/patients/profile');
//       setPatientName(`${response.data.username}`);
//     } catch (err) {
//       console.error('Error fetching user profile:', err);
//       setError('Failed to fetch user profile');
//     }
//   };

//   const fetchPrescriptions = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/prescription');
//       setPrescriptions(response.data);
//     } catch (err) {
//       console.error('Error fetching prescriptions:', err);
//       setError('Failed to fetch prescriptions');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadPDF = (prescription, patientName) => {
//     const doc = new jsPDF();
    
//     // Add title
//     doc.setFontSize(20);
//     doc.setTextColor(41, 128, 185); // Blue color
//     doc.text("Medical Prescription", 105, 15, null, null, "center");
    
//     // Add prescription details
//     doc.setFontSize(12);
//     doc.setTextColor(0, 0, 0); // Black color
//     doc.text(`Doctor: Dr. ${prescription.doctor_name}`, 20, 30);
//     doc.text(`Date:${new Date().toLocaleDateString()}`, 20, 40);
//     doc.text(`Patient: ${patientName}`, 20, 50);
    
//     // Add prescription content
//     doc.autoTable({
//       startY: 60,
//       styles: { fillColor: [249, 249, 249] },
//       headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] },
//       alternateRowStyles: { fillColor: [255, 255, 255] },
//       head: [["Item", "Details"]],
//       body: [
//         ["Diagnosis", prescription.diagnosis],
//         ["Medications", prescription.drugs],
//         ["Treatment Plan", prescription.treatment_plan],
//       ],
//     });
    
//     // Add footer
//     doc.setFontSize(10);
//     doc.setTextColor(128, 128, 128); // Gray color
//     doc.text("© 2024 www.yourhospital.com. All rights reserved", 105, 280, null, null, "center");
    
//     // Save the PDF
//     doc.save(`Prescription_${new Date().toLocaleDateString()}_ ${patientName}_${prescription.doctor_name}.pdf`);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">My Prescriptions</h1>
//         {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
//         {loading ? (
//           <p className="text-center text-lg">Loading...</p>
//         ) : prescriptions.length > 0 ? (
//           <div className="grid md:grid-cols-2 gap-6">
//             {prescriptions.map((prescription, index) => (
//               <PrescriptionCard
//                 key={index}
//                 prescription={prescription}
//                 patientName={patientName}
//                 onDownload={() => downloadPDF(prescription, patientName)}
//               />
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-lg">No prescriptions available.</p>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// }







// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import {
//   Download,
//   Calendar,
//   User,
//   ClipboardList,
//   Pill,
//   Activity,
//   PlusCircle,
// } from "lucide-react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// axios.defaults.withCredentials = true;

// const PrescriptionCard = ({ prescription, patientName, onDownload }) => (
//   <div className="bg-white border-2 border-wtext-white rounded-xl p-6 mb-6 transition-all duration-500 hover:shadow-lg hover:scale-105 ">
//     <div className="flex justify-between items-start mb-4">
//       <h2 className="text-2xl font-sans font-bold text-[#05464e]">
//         Prescription
//       </h2>
//       {/* <span className="text-white text-xs font-bold px-3 py-1 rounded-full bg-[#05464e]">
//         Active
//       </span> */}
//     </div>
//     <div className="space-y-4 font-sans">
//       <div className="flex items-center text-[#05464e]">
//         <User className="w-5 h-5 mr-2" />
//         <span className="font-medium">Dr. {prescription.doctor_name}</span>
//       </div>
//       <div className="flex items-center text-[#05464e]">
//         <Calendar className="w-5 h-5 mr-2" />
//         <span>{new Date().toLocaleDateString()}</span>
//       </div>
//       <div className="flex items-center text-[#05464e]">
//         <User className="w-5 h-5 mr-2" />
//         <span>Patient: {patientName}</span>
//       </div>
//       <div className="space-y-2">
//         <div className="flex items-center text-[#05464e]">
//           <ClipboardList className="w-5 h-5 mr-2" />
//           <span className="font-medium">Diagnosis:</span>
//         </div>
//         <p className="text-[#05464e] text-opacity-80 ml-7">
//           {prescription.diagnosis}
//         </p>
//       </div>
//       <div className="space-y-2">
//         <div className="flex items-center text-[#05464e]">
//           <Pill className="w-5 h-5 mr-2" />
//           <span className="font-medium">Medications:</span>
//         </div>
//         <p className="text-[#05464e] text-opacity-80 ml-7">
//           {prescription.drugs}
//         </p>
//       </div>
//       <div className="space-y-2">
//         <div className="flex items-center text-[#05464e]">
//           <Activity className="w-5 h-5 mr-2" />
//           <span className="font-medium">Treatment Plan:</span>
//         </div>
//         <p className="text-[#05464e] text-opacity-80 ml-7">
//           {prescription.treatment_plan}
//         </p>
//       </div>
//     </div>
//     <button
//       className="mt-6 w-full bg-[#05464e] hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-full transition duration-300 flex items-center justify-center"
//       onClick={onDownload}
//     >
//       <Download className="w-5 h-5 mr-2" />
//       Download PDF
//     </button>
//   </div>
// );

// export default function MyPrescriptionPage() {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [patientName, setPatientName] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUserProfile();
//     fetchPrescriptions();
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/patients/profile"
//       );
//       setPatientName(`${response.data.username}`);
//     } catch (err) {
//       console.error("Error fetching user profile:", err);
//       setError("Failed to fetch user profile");
//     }
//   };

//   const fetchPrescriptions = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/prescription"
//       );
//       setPrescriptions(response.data);
//     } catch (err) {
//       console.error("Error fetching prescriptions:", err);
//       setError("Failed to fetch prescriptions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadPDF = (prescription, patientName) => {
//     const doc = new jsPDF();

//     doc.setFontSize(20);
//     doc.setTextColor(31, 43, 108); // #05464e
//     doc.text("Medical Prescription", 105, 15, null, null, "center");

//     doc.setFontSize(12);
//     doc.setTextColor(0, 0, 0);
//     doc.text(`Doctor: Dr. ${prescription.doctor_name}`, 20, 30);
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40);
//     doc.text(`Patient: ${patientName}`, 20, 50);

//     doc.autoTable({
//       startY: 60,
//       styles: { fillColor: [191, 210, 248] }, // #BFD2F8
//       headStyles: { fillColor: [31, 43, 108], textColor: [255, 255, 255] }, // #05464e
//       alternateRowStyles: { fillColor: [255, 255, 255] },
//       head: [["Item", "Details"]],
//       body: [
//         ["Diagnosis", prescription.diagnosis],
//         ["Medications", prescription.drugs],
//         ["Treatment Plan", prescription.treatment_plan],
//       ],
//     });

//     doc.setFontSize(10);
//     doc.setTextColor(128, 128, 128);
//     doc.text(
//       "© 2024 www.yourhospital.com. All rights reserved",
//       105,
//       280,
//       null,
//       null,
//       "center"
//     );

//     doc.save(
//       `Prescription_${new Date().toLocaleDateString()}_${patientName}_${
//         prescription.doctor_name
//       }.pdf`
//     );
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-50 p-6 font-sans">
//         <div className="max-w-5xl mx-auto mt-16 bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-lg">
//           <div className="p-6">
//             <h1 className="text-4xl font-bold text-[#05464e] mb-8 text-center relative font-sans">
//               <span>My Prescriptions</span>
//               <div className="absolute -bottom-2 w-96 left-1/2 transform -translate-x-1/2 h-0.5 bg-wtext-white"></div>
//             </h1>

//             {error && (
//               <p className="text-center text-red-600 bg-red-100 rounded-lg p-3 animate-pulse mb-6">
//                 {error}
//               </p>
//             )}

//             {loading ? (
//               <div className="flex justify-center items-center space-x-2 my-6">
//                 <div className="w-3 h-3 bg-[#05464e] rounded-full animate-bounce"></div>
//                 <div className="w-3 h-3 bg-[#05464e] rounded-full animate-bounce200"></div>
//                 <div className="w-3 h-3 bg-[#05464e] rounded-full animate-bounce400"></div>
//               </div>
//             ) : prescriptions.length > 0 ? (
//               <div className="grid md:grid-cols-2 gap-6">
//                 {prescriptions.map((prescription, index) => (
//                   <PrescriptionCard
//                     key={index}
//                     prescription={prescription}
//                     patientName={patientName}
//                     onDownload={() => downloadPDF(prescription, patientName)}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center text-[#05464e] text-lg bg-wtext-white bg-opacity-30 rounded-lg p-6 animate-pulse">
//                 <p className="mb-4">No prescriptions available.</p>
//                 <button className="bg-[#05464e] text-white py-2 px-4 rounded-full text-base font-bold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-md flex items-center justify-center mx-auto">
//                   <PlusCircle className="mr-2" size={20} />
//                   Request New Prescription
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }





// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import {
//   Download,
//   Calendar,
//   User,
//   Stethoscope,
//   ClipboardList,
//   Pill,
//   Activity,
//   PlusCircle,
// } from "lucide-react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// axios.defaults.withCredentials = true;

// const PrescriptionCard = ({ prescription, patientName, onDownload }) => (
//   <div className="bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl">
//     <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center space-x-3">
//           <Stethoscope className="w-6 h-6" />
//           <span className="font-semibold text-lg">
//             Dr. {prescription.doctor_name}
//           </span>
//         </div>
//         <span className="bg-white text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
//           Active
//         </span>
//       </div>
//       <div className="flex items-center space-x-3 mb-2">
//         <Calendar className="w-5 h-5" />
//         <span>{new Date().toLocaleDateString()}</span>
//       </div>
//       <div className="flex items-center space-x-3">
//         <User className="w-5 h-5" />
//         <span>Patient: {patientName}</span>
//       </div>
//     </div>
//     <div className="p-6 space-y-4">
//       <div>
//         <div className="flex items-center text-indigo-700 mb-2">
//           <ClipboardList className="w-5 h-5 mr-2" />
//           <span className="font-medium">Diagnosis</span>
//         </div>
//         <p className="text-gray-700 ml-7">{prescription.diagnosis}</p>
//       </div>
//       <div>
//         <div className="flex items-center text-indigo-700 mb-2">
//           <Pill className="w-5 h-5 mr-2" />
//           <span className="font-medium">Medications</span>
//         </div>
//         <p className="text-gray-700 ml-7">{prescription.drugs}</p>
//       </div>
//       <div>
//         <div className="flex items-center text-indigo-700 mb-2">
//           <Activity className="w-5 h-5 mr-2" />
//           <span className="font-medium">Treatment Plan</span>
//         </div>
//         <p className="text-gray-700 ml-7">{prescription.treatment_plan}</p>
//       </div>
//       <button
//         className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
//         onClick={onDownload}
//       >
//         <Download className="w-5 h-5 mr-2" />
//         Download PDF
//       </button>
//     </div>
//   </div>
// );

// export default function MyPrescriptionPage() {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [patientName, setPatientName] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUserProfile();
//     fetchPrescriptions();
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/patients/profile"
//       );
//       setPatientName(`${response.data.username}`);
//     } catch (err) {
//       console.error("Error fetching user profile:", err);
//       setError("Failed to fetch user profile");
//     }
//   };

//   const fetchPrescriptions = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/prescription"
//       );
//       setPrescriptions(response.data);
//     } catch (err) {
//       console.error("Error fetching prescriptions:", err);
//       setError("Failed to fetch prescriptions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadPDF = (prescription, patientName) => {
//     const doc = new jsPDF();

//     doc.setFontSize(20);
//     doc.setTextColor(67, 56, 202);
//     doc.text("Medical Prescription", 105, 15, null, null, "center");

//     doc.setFontSize(12);
//     doc.setTextColor(0, 0, 0);
//     doc.text(`Doctor: Dr. ${prescription.doctor_name}`, 20, 30);
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40);
//     doc.text(`Patient: ${patientName}`, 20, 50);

//     doc.autoTable({
//       startY: 60,
//       styles: { fillColor: [237, 242, 247] },
//       headStyles: { fillColor: [67, 56, 202], textColor: [255, 255, 255] },
//       alternateRowStyles: { fillColor: [255, 255, 255] },
//       head: [["Item", "Details"]],
//       body: [
//         ["Diagnosis", prescription.diagnosis],
//         ["Medications", prescription.drugs],
//         ["Treatment Plan", prescription.treatment_plan],
//       ],
//     });

//     doc.setFontSize(10);
//     doc.setTextColor(128, 128, 128);
//     doc.text(
//       "© 2024 www.yourhospital.com. All rights reserved",
//       105,
//       280,
//       null,
//       null,
//       "center"
//     );

//     doc.save(
//       `Prescription_${new Date().toLocaleDateString()}_${patientName}_${
//         prescription.doctor_name
//       }.pdf`
//     );
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-100 p-6 font-sans">
//         <div className="max-w-6xl mx-auto mt-16">
//           <h1 className="text-4xl font-bold text-indigo-700 mb-12 text-center relative">
//             <span>My Prescriptions</span>
//             <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-indigo-500 rounded-full"></div>
//           </h1>

//           {error && (
//             <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg animate-pulse">
//               <p className="font-bold">Error</p>
//               <p>{error}</p>
//             </div>
//           )}

//           {loading ? (
//             <div className="flex justify-center items-center space-x-2 my-12">
//               <div className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse"></div>
//               <div className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse delay-150"></div>
//               <div className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse delay-300"></div>
//             </div>
//           ) : prescriptions.length > 0 ? (
//             <div className="grid md:grid-cols-2 gap-8">
//               {prescriptions.map((prescription, index) => (
//                 <PrescriptionCard
//                   key={index}
//                   prescription={prescription}
//                   patientName={patientName}
//                   onDownload={() => downloadPDF(prescription, patientName)}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="bg-white shadow-lg rounded-lg p-8 text-center">
//               <p className="text-xl text-gray-700 mb-6">
//                 No prescriptions available.
//               </p>
//               <button className="bg-indigo-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center mx-auto">
//                 <PlusCircle className="mr-2" size={24} />
//                 Request New Prescription
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }



import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  Download,
  Calendar,
  User,
  Stethoscope,
  ClipboardList,
  Pill,
  Activity,
  ChevronDown,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

axios.defaults.withCredentials = true;

const PrescriptionCard = ({ prescription, patientName, onDownload }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl">
      <div
        className="bg-[#05464e] p-6 text-white cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Stethoscope className="w-6 h-6 text-white" />
            <span className="font-semibold text-lg">
              Dr. {prescription.doctor_name}
            </span>
          </div>
          <ChevronDown
            className={`w-6 h-6 transition-transform duration-300 ${
              isExpanded ? "transform rotate-180" : ""
            }`}
          />
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-white" />
            <span className="text-sm">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-white" />
            <span className="text-sm">{patientName}</span>
          </div>
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isExpanded ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="p-6 bg-wtext-white bg-opacity-10 space-y-4">
          <div>
            <div className="flex items-center text-[#05464e] mb-2">
              <ClipboardList className="w-5 h-5 mr-2" />
              <span className="font-medium">Diagnosis</span>
            </div>
            <p className="text-gray-700 ml-7">{prescription.diagnosis}</p>
          </div>
          <div>
            <div className="flex items-center text-[#05464e] mb-2">
              <Pill className="w-5 h-5 mr-2" />
              <span className="font-medium">Medications</span>
            </div>
            <p className="text-gray-700 ml-7">{prescription.drugs}</p>
          </div>
          <div>
            <div className="flex items-center text-[#05464e] mb-2">
              <Activity className="w-5 h-5 mr-2" />
              <span className="font-medium">Treatment Plan</span>
            </div>
            <p className="text-gray-700 ml-7">{prescription.treatment_plan}</p>
          </div>
          <button
            className="w-full bg-[#05464e] hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              onDownload();
            }}
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default function MyPrescriptionPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
    fetchPrescriptions();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/patients/profile"
      );
      setPatientName(`${response.data.username}`);
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError("Failed to fetch user profile");
    }
  };

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/prescription"
      );
      setPrescriptions(response.data);
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
      setError("Failed to fetch prescriptions");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = (prescription, patientName) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(31, 43, 108); // #05464e
    doc.text("Medical Prescription", 105, 15, null, null, "center");

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Doctor: Dr. ${prescription.doctor_name}`, 20, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40);
    doc.text(`Patient: ${patientName}`, 20, 50);

    doc.autoTable({
      startY: 60,
      styles: { fillColor: [191, 210, 248] }, // #BFD2F8
      headStyles: { fillColor: [31, 43, 108], textColor: [255, 255, 255] }, // #05464e
      alternateRowStyles: { fillColor: [255, 255, 255] },
      head: [["Item", "Details"]],
      body: [
        ["Diagnosis", prescription.diagnosis],
        ["Medications", prescription.drugs],
        ["Treatment Plan", prescription.treatment_plan],
      ],
    });

    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text(
      "© 2024 www.yourhospital.com. All rights reserved",
      105,
      280,
      null,
      null,
      "center"
    );

    doc.save(
      `Prescription_${new Date().toLocaleDateString()}_${patientName}_${
        prescription.doctor_name
      }.pdf`
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6 font-serif">
        <div className="max-w-7xl mx-auto mt-16">
          <h1 className="text-4xl font-bold text-[#05464e] mb-12 text-center relative">
            <span>My Prescriptions</span>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full"></div>
          </h1>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg animate-pulse">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center space-x-2 my-12">
              <div className="w-4 h-4 bg-[#05464e] rounded-full animate-pulse"></div>
              <div className="w-4 h-4 bg-[#05464e] rounded-full animate-pulse delay-150"></div>
              <div className="w-4 h-4 bg-[#05464e] rounded-full animate-pulse delay-300"></div>
            </div>
          ) : prescriptions.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prescriptions.map((prescription, index) => (
                <PrescriptionCard
                  key={index}
                  prescription={prescription}
                  patientName={patientName}
                  onDownload={() => downloadPDF(prescription, patientName)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-lg p-8 text-center">
              <p className="text-xl text-gray-700 mb-6">
                No prescriptions available.
              </p>
              <button className="bg-[#05464e] text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center mx-auto">
                Request New Prescription
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
