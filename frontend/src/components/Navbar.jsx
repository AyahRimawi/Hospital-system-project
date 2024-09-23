// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout, checkAuthStatus, getProfile } from '../store/authSlice';

// const Navbar = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const { isAuthenticated, user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(checkAuthStatus());
//     if (isAuthenticated) {
//       dispatch(getProfile());
//     }
//   }, [dispatch, isAuthenticated]);

//   const handleDropdownToggle = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setIsDropdownOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await dispatch(logout());
//       navigate('/login');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   const getProfileImageUrl = () => {
//     if (user && user.profile_image) {
//       return `http://localhost:5000/${user.profile_image}`;
//     }
//     return "https://via.placeholder.com/40";
//   };

//   return (
//     <nav className="bg-[#f6f5f2] shadow-md py-4 font-serif">
//       <div className="container mx-auto px-4 flex items-center justify-between">
//         <div className="text-2xl font-bold text-gray-800">
//           <Link to="/">HealthCare</Link>
//         </div>
//         <ul className="hidden md:flex space-x-8">
//           <li>
//             <Link to="/" className="text-gray-600 hover:text-[#04333a]">
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/about" className="text-gray-600 hover:text-[#04333a]">
//               About
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact" className="text-gray-600 hover:text-[#04333a]">
//               Contact
//             </Link>
//           </li>
//           <li>
//             <Link to="/doctor" className="text-gray-600 hover:text-[#04333a]">
//               Our Doctor
//             </Link>
//           </li>
//         </ul>
//         <div className="relative flex items-center space-x-4">
//           {isAuthenticated ? (
//             <>
//               <img
//                 src={getProfileImageUrl()}
//                 alt="User"
//                 className="w-10 h-10 rounded-full cursor-pointer object-cover"
//                 onClick={handleDropdownToggle}
//               />
//               {isDropdownOpen && (
//                 <div
//                   ref={dropdownRef}
//                   className="absolute top-full right-0 mt-2 w-48 bg-[#f6f5f2] border border-gray-200 rounded-lg shadow-lg z-10"
//                 >
//                   <ul className="py-2">
//                     <li>
//                       <Link
//                         to="/profile"
//                         className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                       >
//                         My Profile
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="/history"
//                         className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                       >
//                         My History
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="/prescription"
//                         className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                       >
//                         My Prescription
//                       </Link>
//                     </li>
//                     <li>
//                       <button
//                         onClick={handleLogout}
//                         className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                       >
//                         Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </>
//           ) : (
//             <Link to="/login" className="text-gray-600 hover:text-[#04333a]">
//               Login
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout, checkAuthStatus, getProfile } from "../store/authSlice";

// const Navbar = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const { isAuthenticated, user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(checkAuthStatus());
//     if (isAuthenticated) {
//       dispatch(getProfile());
//     }
//   }, [dispatch, isAuthenticated]);

//   const handleDropdownToggle = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setIsDropdownOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await dispatch(logout());
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const getProfileImageUrl = () => {
//     if (user && user.profile_image) {
//       return `http://localhost:5000/${user.profile_image}`;
//     }
//     return "https://via.placeholder.com/40";
//   };

//   return (
//     <nav className="bg-gradient-to-r from-[#e6f0f5] to-[#04333a] backdrop-blur-md bg-opacity-80 shadow-lg py-4 font-serif fixed w-full z-50 transition-all duration-300 ease-in-out">
//       <div className="container mx-auto px-4 flex items-center justify-between">
//         <div className="text-2xl font-bold text-[#04333a] hover:text-[#025a68] transition-colors duration-300">
//           <Link to="/" className="flex items-center space-x-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-8 w-8"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
//               />
//             </svg>
//             <span>HealthCare</span>
//           </Link>
//         </div>
//         <ul className="hidden md:flex space-x-8">
//           {["Home", "About", "Contact", "Our Doctor"].map((item) => (
//             <li key={item}>
//               <Link
//                 to={
//                   item === "Home"
//                     ? "/"
//                     : `/${item.toLowerCase().replace(" ", "-")}`
//                 }
//                 className="text-[#04333a] hover:text-[#025a68] transition-colors duration-300 relative group"
//               >
//                 {item}
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#025a68] transition-all duration-300 group-hover:w-full"></span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//         <div className="relative flex items-center space-x-4">
//           {isAuthenticated ? (
//             <>
//               <img
//                 src={getProfileImageUrl()}
//                 alt="User"
//                 className="w-10 h-10 rounded-full cursor-pointer object-cover border-2 border-[#04333a] hover:border-[#025a68] transition-colors duration-300"
//                 onClick={handleDropdownToggle}
//               />
//               {isDropdownOpen && (
//                 <div
//                   ref={dropdownRef}
//                   className="absolute top-full right-0 mt-2 w-48 bg-[#f6f5f2] border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden transition-all duration-300 ease-in-out"
//                 >
//                   <ul className="py-2">
//                     {["My Profile", "My History", "My Prescription"].map(
//                       (item) => (
//                         <li key={item}>
//                           <Link
//                             to={`/${item.toLowerCase().replace(" ", "-")}`}
//                             className="block px-4 py-2 text-[#04333a] hover:bg-[#e6f0f5] transition-colors duration-300"
//                           >
//                             {item}
//                           </Link>
//                         </li>
//                       )
//                     )}
//                     <li>
//                       <button
//                         onClick={handleLogout}
//                         className="block w-full text-left px-4 py-2 text-[#04333a] hover:bg-[#e6f0f5] transition-colors duration-300"
//                       >
//                         Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </>
//           ) : (
//             <Link
//               to="/login"
//               className="text-[#04333a] hover:text-[#025a68] transition-colors duration-300 border-2 border-[#04333a] hover:border-[#025a68] px-4 py-2 rounded-full"
//             >
//               Login
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, checkAuthStatus, getProfile } from "../store/authSlice";
import axios from "axios";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [doctor, setDoctors] = useState([]);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/doctors");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    dispatch(checkAuthStatus());
    if (isAuthenticated) {
      dispatch(getProfile());
      fetchNotifications();
    }
  }, [dispatch, isAuthenticated]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/notification/notifications",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNotificationDropdownToggle = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (
      notificationDropdownRef.current &&
      !notificationDropdownRef.current.contains(event.target)
    ) {
      setIsNotificationDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getProfileImageUrl = () => {
    if (user && user.profile_image) {
      return `http://localhost:5000/${user.profile_image}`;
    }
    return "https://via.placeholder.com/40";
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/notification/notifications/${notificationId}/read`,
        null,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchNotifications();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleNotificationClick = async (notification) => {
    try {
      await handleMarkAsRead(notification.id);
      const doctorId = notification.doctor_id;
      if (doctorId) {
        navigate(`/doctor/${doctorId}`, {
          state: { commentId: notification.comment_id },
        });
      } else {
        console.error(
          "No valid doctor ID found in notification:",
          notification
        );
      }
    } catch (error) {
      console.error("Error handling notification click:", error);
    }
    setIsNotificationDropdownOpen(false);
  };

  return (
    <nav className="bg-[#f6f5f2] shadow-md py-4 font-serif">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">HealthCare</Link>
        </div>
        <ul className="hidden md:flex space-x-8">
          <li>
            <Link to="/" className="text-gray-600 hover:text-[#04333a]">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-600 hover:text-[#04333a]">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-gray-600 hover:text-[#04333a]">
              Contact
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link
                to="/feedback"
                className="text-gray-600 hover:text-[#04333a]"
              >
                Feedback
              </Link>
            </li>
          )}
          <li>
            <Link to="/doctor" className="text-gray-600 hover:text-[#04333a]">
              Our Doctor
            </Link>
          </li>
        </ul>
        <div className="relative flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="relative" ref={notificationDropdownRef}>
                <button
                  onClick={handleNotificationDropdownToggle}
                  className="text-gray-600 hover:text-[#04333a] focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
                {notifications.filter((n) => !n.read).length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {notifications.filter((n) => !n.read).length}
                  </span>
                )}
                {isNotificationDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-[#f6f5f2] border border-gray-200 rounded-lg shadow-lg z-10">
                    <ul className="py-2 max-h-64 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <li
                            key={notification.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                              handleNotificationClick(notification)
                            }
                          >
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-sm ${
                                  notification.read
                                    ? "text-gray-500"
                                    : "text-gray-700 font-semibold"
                                }`}
                              >
                                {notification.message}
                              </span>
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-2 text-sm text-gray-500">
                          No notifications
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
              <img
                src={getProfileImageUrl()}
                alt="User"
                className="w-10 h-10 rounded-full cursor-pointer object-cover"
                onClick={handleDropdownToggle}
              />
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full right-0 mt-2 w-48 bg-[#f6f5f2] border border-gray-200 rounded-lg shadow-lg z-10"
                >
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/history"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        My History
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/prescription"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        My Prescription
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-[#04333a]">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;