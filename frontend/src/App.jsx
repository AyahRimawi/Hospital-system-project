

// App.js
import React from 'react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AboutUsPage from './pages/AboutUs';
import ContactUsPage from './pages/ContactUsPage';
import OurDoctorPage from './pages/OurDoctorPage';
import HealthcareDashboard from './pages/ProfileHistoryPage';
import ProfileEditPage from './pages/ProfileEditPage';
import Dashboard from './pages/DoctorPages/Dashboard';
import DoctorProfileEditPage from './pages/DoctorPages/DoctorProfileEditPage';
// import AdminDashboard from './pages/AdminPages/AdminHome';
// import OverviewPage from './pages/AdminPages/AddDoctor';
// import Sidebar from './pages/AdminPages/sidebar';
import AdminHome from './pages/AdminPages/AdminHome';
import AddDoctor from './pages/AdminPages/AddDoctor';
import StaffManagementPage from './pages/AdminPages/StaffManagementPage';
import AddPatient from './pages/AdminPages/AddPatient';
import PatientRecordsPage from './pages/AdminPages/PatientRecordsPage';
import FeedbackPage from './pages/AdminPages/FeedbackPage';
import SchedulesPage from './pages/AdminPages/SchedulesPage';
import AdminLogin from './pages/AdminPages/Login';
import DoctorProfilePage from './pages/DoctorDetailsPage';
import Appointment from './pages/AdminPages/AdminAppointmentPatient';
import MyPrescriptionPage from './pages/MyPrescriptionPage';
import AdminPrescription from './pages/AdminPages/AdminPrescription';
import DoctorLayout from './pages/DoctorPages/DoctorLayout';
import DoctorScheduling from './pages/DoctorPages/DoctorScheduling';
import PatientRecords from './pages/DoctorPages/PatientRecords';
import AdminFeedback from "./pages/AdminPages/AdminFeedback";
import Feedback from "./pages/Feedback";
///
import PaymentPage from "./pages/PayPalPayment";
import PayPalCheckoutButton from "./pages/PayPalPayment";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
///
function App() {
  return (
    <BrowserRouter>
      <PayPalScriptProvider
        options={{
          "client-id":
            "ARR2OFHKxlw9M9u41SWGQF-7LLJRVoAhl6f-9E5jpJsDW-JBXp5eEMrFj9H7TY4d403eWXjKBupQcr-5",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/doctor" element={<OurDoctorPage />} />
          <Route path="/doctor/:id" element={<DoctorProfilePage />} />
          <Route path="/history" element={<HealthcareDashboard />} />
          <Route path="/profile" element={<ProfileEditPage />} />
          <Route path="/feedback" element={<Feedback />} />;
          <Route path="/prescription" element={<MyPrescriptionPage />} />
          <Route path="/AdminDashboard/Feedback" element={<AdminFeedback />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/paypal" element={<PayPalCheckoutButton />} />
          {/* Doctor dashboard */}
          {/* 
        <Route path="/home" element={<Dashboard />} />
        <Route path="/DoctorProfile" element={<DoctorProfileEditPage />} /> */}
          {/* Doctor routes */}
          <Route element={<DoctorLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/DoctorProfile" element={<DoctorProfileEditPage />} />
            <Route path="/DoctorScheduling" element={<DoctorScheduling />} />
            <Route path="/PatientRecords" element={<PatientRecords />} />
          </Route>
          {/* Admin dashboard */}
          <Route path="/AdminDashboard" element={<AdminHome />} />
          <Route path="/AdminDashboard/add-doctor" element={<AddDoctor />} />
          <Route
            path="/AdminDashboard/manage-doctors"
            element={<StaffManagementPage />}
          />
          <Route path="/AdminDashboard/add-patient" element={<AddPatient />} />
          <Route
            path="/AdminDashboard/manage-patients"
            element={<PatientRecordsPage />}
          />
          <Route
            path="/AdminDashboard/show-feedback"
            element={<FeedbackPage />}
          />
          <Route path="/AdminDashboard/schedule" element={<SchedulesPage />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route
            path="/AdminDashboard/Appointement"
            element={<Appointment />}
          />
          <Route
            path="/AdminDashboard/Prescription"
            element={<AdminPrescription />}
          />
        </Routes>
      </PayPalScriptProvider>
    </BrowserRouter>
  );
}

export default App;
