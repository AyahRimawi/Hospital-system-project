
// // Sidebar.js
// import React, { useEffect } from 'react';
// import { FaHome, FaUserMd, FaCalendarAlt, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout, checkAuthStatus } from '../../../store/authSlice'; // Update this path as necessary
// import { getDoctorProfile } from '../../../store/doctorSlice'; // Ensure this path is correct

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { isAuthenticated, userType } = useSelector((state) => state.auth);
//   const { profile } = useSelector((state) => state.doctor);

//   useEffect(() => {
//     dispatch(checkAuthStatus());
//     dispatch(getDoctorProfile()); // Fetch doctor profile when the sidebar is mounted
//   }, [dispatch]);

//   const handleLogout = async () => {
//     try {
//       await dispatch(logout());
//       navigate('/login');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   // Hide the sidebar if the user is not authenticated or not a doctor
//   if (!isAuthenticated || userType !== 'doctor') {
//     return null;
//   }

//   return (
//     <div className="flex flex-col h-screen w-64 bg-gray-800 text-white">
//       <div className="flex flex-col items-center justify-center h-48 bg-gray-900">
//         <img
//           className="w-24 h-24 rounded-full mb-2"
//           src={`http://localhost:5000/${profile?.profile_image}`}
//           alt={profile?.staff_name || 'Doctor'}
//         />
//         <h1 className="text-xl font-semibold mt-2">Doctor Dashboard</h1>
//         <p className="text-sm text-gray-300 mt-1">
//           {profile?.staff_name || 'Doctor'}
//         </p>
//         {profile?.specialty && (
//           <p className="text-xs text-gray-400 mt-1">{profile.specialty}</p>
//         )}
//       </div>
//       <nav className="flex-1 mt-4">
//         <ul className="space-y-2">
//           <li>
//             <Link to="/home" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700">
//               <FaHome className="mr-3" /> Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/DoctorProfile" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700">
//               <FaUserMd className="mr-3" /> My Profile
//             </Link>
//           </li>
//           <li>
//             <Link to="/appointments" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700">
//               <FaCalendarAlt className="mr-3" /> Appointments
//             </Link>
//           </li>
//           <li>
//             <Link to="/patients" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700">
//               <FaUserMd className="mr-3" /> Patients
//             </Link>
//           </li>
//           <li>
//             <Link to="/reports" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700">
//               <FaFileAlt className="mr-3" /> Reports
//             </Link>
//           </li>
//         </ul>
//       </nav>
//       <div className="px-4 py-2 bg-gray-900">
//         <button
//           onClick={handleLogout}
//           className="flex items-center text-gray-300 hover:bg-gray-700 w-full text-left px-4 py-2"
//         >
//           <FaSignOutAlt className="mr-3" /> Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



// import React, { useEffect, useState } from "react";
// import {
//   FaHome,
//   FaUserMd,
//   FaCalendarAlt,
//   FaFileAlt,
//   FaSignOutAlt,
//   FaCog,
// } from "react-icons/fa";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout, checkAuthStatus } from "../../../store/authSlice";
// import { getDoctorProfile } from "../../../store/doctorSlice";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { isAuthenticated, userType } = useSelector((state) => state.auth);
//   const { profile } = useSelector((state) => state.doctor);
//   const [isExpanded, setIsExpanded] = useState(true);

//   useEffect(() => {
//     dispatch(checkAuthStatus());
//     dispatch(getDoctorProfile());
//   }, [dispatch]);

//   const handleLogout = async () => {
//     try {
//       await dispatch(logout());
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   if (!isAuthenticated || userType !== "doctor") {
//     return null;
//   }

//   const navItems = [
//     { to: "/home", icon: FaHome, label: "Home" },
//     { to: "/DoctorProfile", icon: FaUserMd, label: "My Profile" },
//     { to: "/DoctorScheduling", icon: FaCalendarAlt, label: "Appointments" },
//     { to: "/patients", icon: FaUserMd, label: "Patients" },
//     { to: "/reports", icon: FaFileAlt, label: "Reports" },
//   ];

//   return (
//     <div
//       className={`flex flex-col h-screen ${isExpanded ? 'w-64' : 'w-20'} bg-gradient-to-br from-[#1F2B6C] via-[#2a3a8c] to-[#BFD2F8] text-white shadow-2xl transition-all duration-300 ease-in-out`}
//     >
//       <div className="relative flex flex-col items-center justify-center h-48 overflow-hidden">
//         <div className="absolute inset-0 bg-[#1F2B6C] opacity-50 backdrop-blur-sm"></div>
//         <div className={`relative ${isExpanded ? 'scale-100' : 'scale-75'} transition-all duration-300`}>
//           <img
//             className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg hover:scale-105 transition-transform duration-300"
//             src={`http://localhost:5000/${profile?.profile_image}`}
//             alt={profile?.staff_name || "Doctor"}
//           />
//           <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#1F2B6C] to-transparent opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
//         </div>
//         {isExpanded && (
//           <div className="mt-4 text-center z-10">
//             <h1 className="text-xl font-bold text-white animate-fadeIn">
//               {profile?.staff_name || "Doctor"}
//             </h1>
//             {profile?.specialty && (
//               <p className="text-sm text-[#BFD2F8] mt-1 animate-fadeIn">
//                 {profile.specialty}
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//       <nav className="flex-1 mt-6 px-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[#BFD2F8] scrollbar-track-[#1F2B6C]">
//         <ul className="space-y-2">
//           {navItems.map((item) => (
//             <li key={item.to}>
//               <Link
//                 to={item.to}
//                 className={`flex items-center px-4 py-3 rounded-lg text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300 ease-in-out transform hover:scale-105 ${
//                   location.pathname === item.to ? 'bg-white bg-opacity-20' : ''
//                 }`}
//               >
//                 <item.icon className={`${isExpanded ? 'mr-3' : 'mx-auto'} text-[#BFD2F8] text-xl`} />
//                 {isExpanded && <span className="font-medium">{item.label}</span>}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//       <div className="px-4 py-4">
//         <button
//           onClick={handleLogout}
//           className="flex items-center justify-center w-full px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
//         >
//           <FaSignOutAlt className={`${isExpanded ? 'mr-3' : ''} text-xl`} />
//           {isExpanded && <span className="font-medium">Logout</span>}
//         </button>
//       </div>
//       <button
//         onClick={() => setIsExpanded(!isExpanded)}
//         className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 ease-in-out"
//       >
//         <FaCog className="text-white text-xl animate-spin-slow" />
//       </button>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaUserMd,
  FaCalendarAlt,
  FaFileAlt,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, checkAuthStatus } from "../../../store/authSlice";
import { getDoctorProfile } from "../../../store/doctorSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, userType } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.doctor);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    dispatch(checkAuthStatus());
    dispatch(getDoctorProfile());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!isAuthenticated || userType !== "doctor") {
    return null;
  }

  const navItems = [
    { to: "/home", icon: FaHome, label: "Dashboard" },
    { to: "/DoctorProfile", icon: FaUserMd, label: "Profile" },
    { to: "/DoctorScheduling", icon: FaCalendarAlt, label: "Appointments" },
    // { to: "/patients", icon: FaUserMd, label: "Patients" },
    { to: "/PatientRecords", icon: FaFileAlt, label: "Patient Records" },
  ];

  return (
    <div
      className={`flex flex-col h-screen ${
        isExpanded ? "w-60" : "w-20"
      } bg-[#1F2B6C] text-white shadow-md transition-all duration-300 ease-in-out font-serif ml-1`}
    >
      <div className="relative flex flex-col items-center justify-center mb-2 mt-6 h-40 border-b border-[#BFD2F8] border-opacity-20">
        <div
          className={`relative ${
            isExpanded ? "scale-100" : "scale-75"
          } transition-all duration-300`}
        >
          <img
            className="w-20 h-20 rounded-full object-cover border-2 border-[#BFD2F8] shadow-sm hover:scale-105 transition-transform duration-300"
            src={`http://localhost:5000/${profile?.profile_image}`}
            alt={profile?.staff_name || "Doctor"}
          />
        </div>
        {isExpanded && (
          <div className="mt-2 text-center">
            <h1 className="text-lg font-semibold text-white">
              {profile?.staff_name || "Doctor"}
            </h1>
            {profile?.specialty && (
              <p className="text-xs text-white mt-1 opacity-70">
                {profile.specialty}
              </p>
            )}
          </div>
        )}
      </div>
      <nav className="flex-1 mt-4 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`flex items-center px-3 py-4 rounded-md text-white hover:bg-[#BFD2F8] hover:bg-opacity-10 transition-all duration-200 ease-in-out ${
                  location.pathname === item.to
                    ? "bg-[#BFD2F8] bg-opacity-10"
                    : ""
                }`}
              >
                <item.icon
                  className={`${
                    isExpanded ? "mr-3" : "mx-auto"
                  } text-white text-lg`}
                />
                {isExpanded && <span className="text-sm">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="px-3 py-3 border-t border-[#BFD2F8] border-opacity-20">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full px-3 py-2 text-white hover:bg-[#BFD2F8] hover:bg-opacity-10 rounded-md transition-all duration-200 ease-in-out"
        >
          <FaSignOutAlt className={`${isExpanded ? "mr-3" : ""} text-lg`} />
          {isExpanded && <span className="text-sm">Logout</span>}
        </button>
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute top-2 right-2 p-1 rounded-full text-white hover:bg-[#BFD2F8] hover:bg-opacity-10 transition-all duration-200 ease-in-out"
      >
        <FaCog className="text-lg" />
      </button>
    </div>
  );
};

export default Sidebar;