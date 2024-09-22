import React from "react";
import { useSelector } from "react-redux";
// import Sidebar from "./components/Sidebar";
import DoctorAppointments from "./components/appointments";
// import PatientRecords from "./components/patiantsRecords";
const DoctorHome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    // <div className="flex h-screen bg-gray-100">
    //   <Sidebar />
    //   <div className="flex-1 overflow-auto">
    //     <div className="container mx-auto px-4 py-8">
    //       {/* <h1 className="text-3xl font-bold mb-4">Doctor Dashboard</h1> */}
    //   <h2 className="text-xl mb-4 mt-4 text-center font-serif font-semibold text-[#1F2B6C]">
    //         {" "}
    //         Welcome Doctor, {user?.staff_name || "مالك"}
    //       </h2>
          // <DoctorAppointments />
          // <PatientRecords />
    //     </div>
    //   </div>
    // </div>
    <div className="container mx-auto px-4 py-8 bg-white">
      {/* <h1 className="text-3xl font-bold mb-4">Doctor Dashboard</h1> */}
      <h2 className="text-xl mb-4 mt-4 text-center font-serif font-semibold text-[#1F2B6C]">
        Welcome Doctor, {user?.staff_name || "مالك"}
      </h2>
       <DoctorAppointments />
    </div>
  );
};

export default DoctorHome;
