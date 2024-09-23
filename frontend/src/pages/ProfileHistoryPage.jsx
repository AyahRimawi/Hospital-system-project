
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UnreviewedAppointments from "../components/UnreviewedAppointments";

const PatientProfile = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/patients/profile",
          {
            withCredentials: true,
          }
        );
        setPatientData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch patient profile");
        setLoading(false);
      }
    };

    fetchPatientProfile();
  }, []);

  const downloadAppointmentDetails = (index) => {
    const appointment = patientData.appointments[index];
    const pdf = new jsPDF("p", "mm", "a4");

    // Set colors
    const primaryColor = "#05464e";
    const secondaryColor = "#e6f0f5";

    // Header
    pdf.setFillColor(primaryColor);
    pdf.rect(0, 0, 210, 40, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.text("Hospital Management System", 105, 20, { align: "center" });
    pdf.setFontSize(16);
    pdf.text(`Appointment Details for ${patientData.username}`, 105, 35, {
      align: "center",
    });

    // Reset text color
    pdf.setTextColor(0, 0, 0);

    // Patient Information
    pdf.setFontSize(18);
    pdf.setTextColor(primaryColor);
    pdf.text("Patient Information:", 20, 60);
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Name: ${patientData.username}`, 25, 70);
    pdf.text(`Email: ${patientData.email}`, 25, 80);
    pdf.text(`Gender: ${patientData.gender}`, 25, 90);
    pdf.text(`Age: ${patientData.age}`, 25, 100);
    pdf.text(`Blood Type: ${patientData.blood}`, 25, 110);

    // Appointment Information
    pdf.setFontSize(18);
    pdf.setTextColor(primaryColor);
    pdf.text("Appointment Details:", 20, 130);
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Doctor Name: ${appointment.doctor_name}`, 25, 140);
    pdf.text(`Time of Appointment: ${appointment.appointment_time}`, 25, 150);

    // Additional Information
    pdf.setFontSize(18);
    pdf.setTextColor(primaryColor);
    pdf.text("Additional Information:", 20, 170);
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Allergies: ${patientData.haveallergy}`, 25, 180);
    pdf.text(`Chronic Diseases: ${patientData.chronic_diseases}`, 25, 190);

    // Footer with copyright
    pdf.setFontSize(10);
    pdf.setTextColor(secondaryColor);
    const websiteName = "www.yourhospital.com";
    pdf.text(
      `© ${new Date().getFullYear()} ${websiteName}. All rights reserved.`,
      105,
      285,
      { align: "center" }
    );

    // Download the PDF
    pdf.save(`appointment_${index + 1}.pdf`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!patientData) return <div>No patient data available</div>;

  return (
    <>
      <Navbar />
      <div className="bg-white mt-20 min-h-screen p-6 font-serif">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="bg-[#05464e] p-8 md:w-1/3">
              <div className="mb-8">
                <img
                  src={
                    `http://localhost:5000/${patientData.profile_image}` ||
                    "/default-avatar.png"
                  }
                  alt="Profile"
                  className="w-48 h-48 mx-auto rounded-full object-cover border-4 border-[#e6f0f5]"
                />
              </div>
              <h2 className="text-2xl font-bold text-white text-center mb-4">
                {patientData.username}
              </h2>
              <p className="text-[#e6f0f5] text-center">{patientData.email}</p>
            </div>
            <div className="p-8 md:w-2/3">
              <h1 className="text-3xl font-bold text-[#05464e] mb-8">
                Patient Profile
              </h1>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Sex", value: patientData.gender },
                  { label: "Age", value: patientData.age },
                  { label: "Blood Type", value: patientData.blood },
                  { label: "Status", value: patientData.status },
                  {
                    label: "Appointments",
                    value: patientData.appointment_count,
                  },
                  { label: "Allergies", value: patientData.haveallergy },
                  {
                    label: "Chronic Diseases",
                    value: patientData.chronic_diseases,
                  },
                ].map((item, index) => (
                  <div key={index} className="mb-4">
                    <p className="text-[#05464e] text-sm font-semibold">
                      {item.label}
                    </p>
                    <p className="text-gray-700">{item.value}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-semibold text-[#05464e] mb-4">
                Appointment History
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#e6f0f5]">
                      <th className="text-left p-2 text-[#05464e]">
                        Doctor Name
                      </th>
                      <th className="text-left p-2 text-[#05464e]">
                        Time Of Appointment
                      </th>
                      <th className="text-left p-2 text-[#05464e]">Status</th>
                      <th className="text-left p-2 text-[#05464e]">
                        Documents
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientData.appointments?.map((appointment, index) => (
                      <tr key={index} className="border-b border-[#e6f0f5]">
                        <td className="p-2">{appointment.doctor_name}</td>
                        <td className="p-2">{appointment.appointment_time}</td>
                        <td className="p-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              appointment.status === "Under Treatment"
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {appointment.status}
                          </span>
                        </td>
                        <td className="p-2">
                          <button
                            className="flex items-center text-[#05464e] hover:text-[#e6f0f5] transition-colors"
                            onClick={() => downloadAppointmentDetails(index)}
                          >
                            <Download size={16} className="mr-1" /> Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <UnreviewedAppointments/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PatientProfile;