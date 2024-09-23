


// // admin-OurDoctorPage.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const OurDoctorPage = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   const [specialties, setSpecialties] = useState([]);
//   const [selectedSpecialty, setSelectedSpecialty] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [doctorsPerPage] = useState(6);

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   useEffect(() => {
//     filterDoctors();
//   }, [doctors, selectedSpecialty, searchTerm]);

//   const fetchDoctors = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/doctors');
//       const data = await response.json();
//       setDoctors(data);
//       const uniqueSpecialties = [...new Set(data.map(doctor => doctor.specialty))];
//       setSpecialties(uniqueSpecialties);
//     } catch (error) {
//       console.error('Error fetching doctors:', error);
//     }
//   };

//   const filterDoctors = () => {
//     let filtered = doctors;
//     if (selectedSpecialty) {
//       filtered = filtered.filter(doctor => doctor.specialty === selectedSpecialty);
//     }
//     if (searchTerm) {
//       filtered = filtered.filter(doctor =>
//         doctor.staff_name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     setFilteredDoctors(filtered);
//     setCurrentPage(1);
//   };

//   // Get current doctors
//   const indexOfLastDoctor = currentPage * doctorsPerPage;
//   const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
//   const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="bg-gray-100 flex flex-col min-h-screen">
//       <Navbar />
//       <div className="flex-grow py-10">
//         <div className="container mx-auto px-4">
//           <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//             Our Doctors
//           </h1>
//           <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
//             <select
//               className="mb-4 md:mb-0 p-2 border rounded"
//               value={selectedSpecialty}
//               onChange={(e) => setSelectedSpecialty(e.target.value)}
//             >
//               <option value="">All Specialties</option>
//               {specialties.map((specialty, index) => (
//                 <option key={index} value={specialty}>{specialty}</option>
//               ))}
//             </select>
//             <input
//               type="text"
//               placeholder="Search by name"
//               className="p-2 border rounded"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {currentDoctors.map((doctor) => (
//               <div key={doctor.staff_id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//                 <img
//                   src={`http://localhost:5000/${doctor.profile_image}` || 'https://via.placeholder.com/150'}
//                   alt={doctor.staff_name}
//                   className="w-full h-40 object-cover"
//                 />
//                 <div className="p-6">
//                   <h2 className="text-2xl font-bold text-gray-800 mb-2">{doctor.staff_name}</h2>
//                   <h3 className="text-lg text-gray-600 mb-4">{doctor.specialty}</h3>
//                   <p className="text-gray-700 mb-4">{doctor.bio}</p>
//                   <Link to={`/doctor/${doctor.staff_id}`} className="text-blue-500 hover:underline">
//                     View Profile
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="mt-8 flex justify-center">
//             {[...Array(Math.ceil(filteredDoctors.length / doctorsPerPage)).keys()].map((number) => (
//               <button
//                 key={number + 1}
//                 onClick={() => paginate(number + 1)}
//                 className={`mx-1 px-3 py-1 rounded ${
//                   currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
//                 }`}
//               >
//                 {number + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default OurDoctorPage;




// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const OurDoctorPage = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   const [specialties, setSpecialties] = useState([]);
//   const [selectedSpecialty, setSelectedSpecialty] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [doctorsPerPage] = useState(6);

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   useEffect(() => {
//     filterDoctors();
//   }, [doctors, selectedSpecialty, searchTerm]);

//   const fetchDoctors = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/doctors");
//       const data = await response.json();
//       setDoctors(data);
//       const uniqueSpecialties = [
//         ...new Set(data.map((doctor) => doctor.specialty)),
//       ];
//       setSpecialties(uniqueSpecialties);
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//     }
//   };

//   const filterDoctors = () => {
//     let filtered = doctors;
//     if (selectedSpecialty) {
//       filtered = filtered.filter(
//         (doctor) => doctor.specialty === selectedSpecialty
//       );
//     }
//     if (searchTerm) {
//       filtered = filtered.filter((doctor) =>
//         doctor.staff_name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     setFilteredDoctors(filtered);
//     setCurrentPage(1);
//   };

//   // Get current doctors
//   const indexOfLastDoctor = currentPage * doctorsPerPage;
//   const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
//   const currentDoctors = filteredDoctors.slice(
//     indexOfFirstDoctor,
//     indexOfLastDoctor
//   );

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   return (
//     <div className="bg-white flex flex-col min-h-screen font-serif">
//       <Navbar />
//       <div className="flex-grow py-10">
//         <div className="container mx-auto px-4">
//           <h1 className="text-4xl font-bold text-center text-[#1F2B6C] mb-8">
//             Our Doctors
//           </h1>
//           <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
//             <select
//               className="mb-4 md:mb-0 p-2 border-2 border-[#1F2B6C] rounded bg-[#BFD2F8] text-[#1F2B6C]"
//               value={selectedSpecialty}
//               onChange={(e) => setSelectedSpecialty(e.target.value)}
//             >
//               <option value="">All Specialties</option>
//               {specialties.map((specialty, index) => (
//                 <option key={index} value={specialty}>
//                   {specialty}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="text"
//               placeholder="Search by name"
//               className="p-2 border-2 border-[#1F2B6C] rounded bg-[#BFD2F8] text-[#1F2B6C]"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {currentDoctors.map((doctor) => (
//               <motion.div
//                 key={doctor.staff_id}
//                 className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-[#1F2B6C]/30"
//               >
//                 <div className="h-80 w-64">
//                   <img
//                     src={
//                       `http://localhost:5000/${doctor.profile_image}` ||
//                       "https://via.placeholder.com/150"
//                     }
//                     alt={doctor.staff_name}
//                     className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
//                   />
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1F2B6C] group-hover:from-[#1F2B6C]/70 group-hover:via-[#1F2B6C]/60 group-hover:to-[#1F2B6C]/70"></div>
//                 <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
//                   <h2 className="font-serif text-2xl font-bold text-white mb-2">
//                     {doctor.staff_name}
//                   </h2>
//                   <h3 className="text-lg text-[#BFD2F8] mb-4">
//                     {doctor.specialty}
//                   </h3>
//                   <br />
//                   <Link
//                     to={`/doctor/${doctor.staff_id}`}
//                     className="rounded-full bg-[#BFD2F8] py-2 px-3.5 font-serif text-sm capitalize text-[#1F2B6C] shadow shadow-[#1F2B6C]/60 hover:bg-[#1F2B6C] hover:text-white transition-colors duration-300"
//                   >
//                     View Profile
//                   </Link>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//           <div className="mt-8 flex justify-center">
//             {[
//               ...Array(
//                 Math.ceil(filteredDoctors.length / doctorsPerPage)
//               ).keys(),
//             ].map((number) => (
//               <button
//                 key={number + 1}
//                 onClick={() => paginate(number + 1)}
//                 className={`mx-1 px-3 py-1 rounded ${
//                   currentPage === number + 1
//                     ? "bg-[#1F2B6C] text-white"
//                     : "bg-[#BFD2F8] text-[#1F2B6C]"
//                 }`}
//               >
//                 {number + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default OurDoctorPage;



// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const OurDoctorPage = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   const [specialties, setSpecialties] = useState([]);
//   const [selectedSpecialty, setSelectedSpecialty] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [doctorsPerPage] = useState(6);

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   useEffect(() => {
//     filterDoctors();
//   }, [doctors, selectedSpecialty, searchTerm]);

//   const fetchDoctors = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/doctors");
//       const data = await response.json();
//       setDoctors(data);
//       const uniqueSpecialties = [
//         ...new Set(data.map((doctor) => doctor.specialty)),
//       ];
//       setSpecialties(uniqueSpecialties);
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//     }
//   };

//   const filterDoctors = () => {
//     let filtered = doctors;
//     if (selectedSpecialty) {
//       filtered = filtered.filter(
//         (doctor) => doctor.specialty === selectedSpecialty
//       );
//     }
//     if (searchTerm) {
//       filtered = filtered.filter((doctor) =>
//         doctor.staff_name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     setFilteredDoctors(filtered);
//     setCurrentPage(1);
//   };

//   // Get current doctors
//   const indexOfLastDoctor = currentPage * doctorsPerPage;
//   const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
//   const currentDoctors = filteredDoctors.slice(
//     indexOfFirstDoctor,
//     indexOfLastDoctor
//   );

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="bg-white flex flex-col min-h-screen font-sans">
//       <Navbar />
//       <div className="flex-grow py-16">
//         <div className="container mx-auto px-4">
//           <h1 className="text-5xl font-bold text-center text-[#1F2B6C] mb-12">
//             Our Doctors
//           </h1>
//           <div className="mb-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
//             <div className="relative">
//               <select
//                 className="appearance-none bg-white border-2 border-[#BFD2F8] text-[#1F2B6C] py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:border-[#1F2B6C] transition-colors duration-300"
//                 value={selectedSpecialty}
//                 onChange={(e) => setSelectedSpecialty(e.target.value)}
//               >
//                 <option value="">All Specialties</option>
//                 {specialties.map((specialty, index) => (
//                   <option key={index} value={specialty}>
//                     {specialty}
//                   </option>
//                 ))}
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#1F2B6C]">
//                 <svg
//                   className="fill-current h-4 w-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//                 </svg>
//               </div>
//             </div>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search by name"
//                 className="bg-white border-2 border-[#BFD2F8] text-[#1F2B6C] py-3 px-4 rounded-full leading-tight focus:outline-none focus:border-[#1F2B6C] transition-colors duration-300"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <svg
//                   className="w-5 h-5 text-[#1F2B6C]"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   ></path>
//                 </svg>
//               </div>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {currentDoctors.map((doctor) => (
//               <motion.div
//                 key={doctor.staff_id}
//                 className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
//                 whileHover={{ y: -5 }}
//               >
//                 <div className="h-72 w-full">
//                   <img
//                     src={
//                       `http://localhost:5000/${doctor.profile_image}` ||
//                       "https://via.placeholder.com/150"
//                     }
//                     alt={doctor.staff_name}
//                     className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-110"
//                   />
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#1F2B6C] to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>
//                 <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <h2 className="font-sans text-2xl font-bold text-white mb-2">
//                     {doctor.staff_name}
//                   </h2>
//                   <h3 className="text-lg text-[#BFD2F8] mb-4">
//                     {doctor.specialty}
//                   </h3>
//                   <Link
//                     to={`/doctor/${doctor.staff_id}`}
//                     className="rounded-full bg-[#BFD2F8] py-2 px-4 font-sans text-sm font-semibold text-[#1F2B6C] shadow-md hover:bg-white hover:text-[#1F2B6C] transition-colors duration-300"
//                   >
//                     View Profile
//                   </Link>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//           <div className="mt-12 flex justify-center">
//             {[
//               ...Array(
//                 Math.ceil(filteredDoctors.length / doctorsPerPage)
//               ).keys(),
//             ].map((number) => (
//               <button
//                 key={number + 1}
//                 onClick={() => paginate(number + 1)}
//                 className={`mx-1 px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${
//                   currentPage === number + 1
//                     ? "bg-[#1F2B6C] text-white"
//                     : "bg-[#BFD2F8] text-[#1F2B6C] hover:bg-[#1F2B6C] hover:text-white"
//                 }`}
//               >
//                 {number + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default OurDoctorPage;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OurDoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(6);

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [doctors, selectedSpecialty, searchTerm]);

  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/doctors");
      const data = await response.json();
      setDoctors(data);
      const uniqueSpecialties = [
        ...new Set(data.map((doctor) => doctor.specialty)),
      ];
      setSpecialties(uniqueSpecialties);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const filterDoctors = () => {
    let filtered = doctors;
    if (selectedSpecialty) {
      filtered = filtered.filter(
        (doctor) => doctor.specialty === selectedSpecialty
      );
    }
    if (searchTerm) {
      filtered = filtered.filter((doctor) =>
        doctor.staff_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredDoctors(filtered);
    setCurrentPage(1);
  };

  // Get current doctors
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white flex flex-col min-h-screen font-sans">
      <Navbar />
      <div className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center text-[#1F2B6C] mb-12">
            Our Doctors
          </h1>
          <div className="mb-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative">
              <select
                className="appearance-none bg-white border-2 border-[#BFD2F8] text-[#1F2B6C] py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:border-[#1F2B6C] transition-colors duration-300"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                <option value="">All Specialties</option>
                {specialties.map((specialty, index) => (
                  <option key={index} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#1F2B6C]">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name"
                className="bg-white border-2 border-[#BFD2F8] text-[#1F2B6C] py-3 px-4 rounded-full leading-tight focus:outline-none focus:border-[#1F2B6C] transition-colors duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-[#1F2B6C]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {currentDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.staff_id}
                className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-80 w-full">
                  <img
                    src={
                      `http://localhost:5000/${doctor.profile_image}` ||
                      "https://via.placeholder.com/150"
                    }
                    alt={doctor.staff_name}
                    className="h-full w-full object object-center transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4 transition-all duration-300 group-hover:bg-[#1F2B6C] group-hover:bg-opacity-90">
                  <h2 className="font-sans text-xl font-bold text-[#1F2B6C] group-hover:text-white transition-colors duration-300">
                    {doctor.staff_name}
                  </h2>
                  <h3 className="text-lg text-[#1F2B6C] group-hover:text-[#BFD2F8] transition-colors duration-300 mt-2 opacity-0 group-hover:opacity-100">
                    {doctor.specialty}
                  </h3>
                  <Link
                    to={`/doctor/${doctor.staff_id}`}
                    className="mt-3 inline-block rounded-full bg-[#BFD2F8] py-2 px-4 font-sans text-sm font-semibold text-[#1F2B6C] shadow-md hover:bg-white hover:text-[#1F2B6C] transition-colors duration-300 opacity-0 group-hover:opacity-100"
                  >
                    View Profile
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-12 flex justify-center">
            {[
              ...Array(
                Math.ceil(filteredDoctors.length / doctorsPerPage)
              ).keys(),
            ].map((number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`mx-1 px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${
                  currentPage === number + 1
                    ? "bg-[#1F2B6C] text-white"
                    : "bg-[#BFD2F8] text-[#1F2B6C] hover:bg-[#1F2B6C] hover:text-white"
                }`}
              >
                {number + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OurDoctorPage;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faStethoscope,
//   faUserMd,
//   faNotesMedical,
// } from "@fortawesome/free-solid-svg-icons";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const OurDoctorPage = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   const [specialties, setSpecialties] = useState([]);
//   const [selectedSpecialty, setSelectedSpecialty] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [doctorsPerPage] = useState(6);

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   useEffect(() => {
//     filterDoctors();
//   }, [doctors, selectedSpecialty, searchTerm]);

//   const fetchDoctors = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/doctors");
//       const data = await response.json();
//       setDoctors(data);
//       const uniqueSpecialties = [
//         ...new Set(data.map((doctor) => doctor.specialty)),
//       ];
//       setSpecialties(uniqueSpecialties);
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//     }
//   };

//   const filterDoctors = () => {
//     let filtered = doctors;
//     if (selectedSpecialty) {
//       filtered = filtered.filter(
//         (doctor) => doctor.specialty === selectedSpecialty
//       );
//     }
//     if (searchTerm) {
//       filtered = filtered.filter((doctor) =>
//         doctor.staff_name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     setFilteredDoctors(filtered);
//     setCurrentPage(1);
//   };

//   // Get current doctors
//   const indexOfLastDoctor = currentPage * doctorsPerPage;
//   const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
//   const currentDoctors = filteredDoctors.slice(
//     indexOfFirstDoctor,
//     indexOfLastDoctor
//   );

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="bg-[#f6f5f2] flex flex-col min-h-screen font-serif">
//       <Navbar />
//       <div className="flex-grow py-16">
//         <div className="container mx-auto px-4">
//           <motion.h1
//             className="text-5xl font-extrabold text-[#05464e] mb-6 text-center md:mb-16"
//             style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             Our Doctors
//           </motion.h1>
//           <motion.div
//             className="mb-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <div className="relative">
//               <select
//                 className="appearance-none bg-white border-2 border-[#e6f0f5] text-[#04333a] py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:border-[#04333a] transition-colors duration-300"
//                 value={selectedSpecialty}
//                 onChange={(e) => setSelectedSpecialty(e.target.value)}
//               >
//                 <option value="">All Specialties</option>
//                 {specialties.map((specialty, index) => (
//                   <option key={index} value={specialty}>
//                     {specialty}
//                   </option>
//                 ))}
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#04333a]">
//                 <FontAwesomeIcon icon={faStethoscope} />
//               </div>
//             </div>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search by name"
//                 className="bg-white border-2 border-[#e6f0f5] text-[#04333a] py-3 px-4 rounded-full leading-tight focus:outline-none focus:border-[#04333a] transition-colors duration-300"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <FontAwesomeIcon icon={faUserMd} className="text-[#04333a]" />
//               </div>
//             </div>
//           </motion.div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {currentDoctors.map((doctor, index) => (
//               <motion.div
//                 key={doctor.staff_id}
//                 className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white"
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 whileHover={{ y: -5 }}
//               >
//                 <div className="h-72 w-full p-4">
//                   <img
//                     src={
//                       `http://localhost:5000/${doctor.profile_image}` ||
//                       "https://via.placeholder.com/150"
//                     }
//                     alt={doctor.staff_name}
//                     className="h-full w-full object-contain object-center rounded-lg transition-transform duration-500 group-hover:scale-110"
//                   />
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#04333a] to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>
//                 <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <FontAwesomeIcon
//                     icon={faNotesMedical}
//                     className="text-4xl text-[#e6f0f5] mb-4"
//                   />
//                   <h2 className="font-sans text-2xl font-bold text-white mb-2">
//                     {doctor.staff_name}
//                   </h2>
//                   <h3 className="text-lg text-[#e6f0f5] mb-4">
//                     {doctor.specialty}
//                   </h3>
//                   <Link
//                     to={`/doctor/${doctor.staff_id}`}
//                     className="rounded-full bg-[#e6f0f5] py-2 px-4 font-sans text-sm font-semibold text-[#04333a] shadow-md hover:bg-white hover:text-[#04333a] transition-colors duration-300"
//                   >
//                     View Profile
//                   </Link>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//           <motion.div
//             className="mt-12 flex justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//           >
//             {[
//               ...Array(
//                 Math.ceil(filteredDoctors.length / doctorsPerPage)
//               ).keys(),
//             ].map((number) => (
//               <button
//                 key={number + 1}
//                 onClick={() => paginate(number + 1)}
//                 className={`mx-1 px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${
//                   currentPage === number + 1
//                     ? "bg-[#04333a] text-white"
//                     : "bg-[#e6f0f5] text-[#04333a] hover:bg-[#04333a] hover:text-white"
//                 }`}
//               >
//                 {number + 1}
//               </button>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default OurDoctorPage;