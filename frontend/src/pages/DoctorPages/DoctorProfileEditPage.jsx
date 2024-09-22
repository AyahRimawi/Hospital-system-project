
// import React, { useState, useEffect } from "react";
// import { ArrowLeft, Camera, Stethoscope, Save } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { getDoctorProfile, updateDoctorProfile, updateDoctorProfileImage } from "../../store/doctorSlice";

// const DoctorProfileEditPage = () => {
//   const dispatch = useDispatch();
//   const { profile, error, loading } = useSelector((state) => state.doctor);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [specialty, setSpecialty] = useState("");
//   const [bio, setBio] = useState("");
//   const [profileImage, setProfileImage] = useState(null);
//   const [localImageUrl, setLocalImageUrl] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     dispatch(getDoctorProfile());
//   }, [dispatch]);

//   useEffect(() => {
//     if (profile) {
//       setName(profile.staff_name || "");
//       setEmail(profile.email || "");
//       setSpecialty(profile.specialty || "");
//       setBio(profile.bio || "");
//       setProfileImage(profile.profile_image || null);
//     }
//   }, [profile]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(
//         updateDoctorProfile({
//           staff_name: name,
//           email,
//           password,
//           specialty,
//           bio,
//         })
//       ).unwrap();
//       toast.success("Profile updated successfully");
//       setIsEditing(false);
//       setPassword(""); // Clear password field after update
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       toast.error("Failed to update profile. Please try again later.");
//     }
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       try {
//         const localUrl = URL.createObjectURL(file);
//         setLocalImageUrl(localUrl);

//         const result = await dispatch(updateDoctorProfileImage(file)).unwrap();

//         setProfileImage(result.profile_image);
//         toast.success("Profile image updated successfully");
//       } catch (error) {
//         console.error("Error uploading image:", error);
//         toast.error("Failed to update profile image. Please try again later.");
//         setLocalImageUrl(null);
//       }
//     }
//   };

//   const getCurrentImageUrl = () => {
//     if (localImageUrl) {
//       return localImageUrl;
//     } else if (profileImage) {
//       return `http://localhost:5000/${profileImage}`;
//     }
//     return "https://via.placeholder.com/150";
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="bg-blue-50 min-h-screen p-6">
//         <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="md:flex">
//             <div className="md:flex-shrink-0">
//               <div className="p-8">
//                 <div className="relative">
//                   <img
//                     src={getCurrentImageUrl()}
//                     alt="Profile"
//                     className="w-48 h-48 rounded-full object-cover border-4 border-blue-500"
//                   />
//                   <label
//                     htmlFor="profile-image-upload"
//                     className="absolute bottom-0 right-0 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors cursor-pointer"
//                   >
//                     <Camera size={24} />
//                   </label>
//                   <input
//                     id="profile-image-upload"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="hidden"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="p-8 md:flex-1">
//               <div className="flex items-center mb-6">
//                 <Link to="/home" className="text-blue-600 hover:text-blue-800 mr-4">
//                   <ArrowLeft size={24} />
//                 </Link>
//                 <h2 className="text-3xl font-bold text-gray-800">
//                   Edit Doctor Profile
//                 </h2>
//               </div>

//               {error && <div className="text-red-500 mb-4">{error}</div>}

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                     disabled={!isEditing}
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                     disabled={!isEditing}
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="specialty"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Specialty
//                   </label>
//                   <input
//                     type="text"
//                     id="specialty"
//                     value={specialty}
//                     onChange={(e) => setSpecialty(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                     disabled={!isEditing}
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="bio"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Bio
//                   </label>
//                   <textarea
//                     id="bio"
//                     value={bio}
//                     onChange={(e) => setBio(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     rows="4"
//                     disabled={!isEditing}
//                   ></textarea>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="password"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     New Password
//                   </label>
//                   <input
//                     type="password"
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     disabled={!isEditing}
//                   />
//                 </div>

//                 <div className="flex justify-end space-x-4">
//                   {!isEditing ? (
//                     <button
//                       type="button"
//                       onClick={() => setIsEditing(true)}
//                       className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
//                     >
//                       <Stethoscope className="mr-2" size={20} />
//                       Edit Profile
//                     </button>
//                   ) : (
//                     <>
//                       <button
//                         type="button"
//                         onClick={() => setIsEditing(false)}
//                         className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center"
//                       >
//                         <Save className="mr-2" size={20} />
//                         Save Changes
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DoctorProfileEditPage;



// import React, { useState, useEffect } from "react";
// import { ArrowLeft, Camera, Stethoscope, Save } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   getDoctorProfile,
//   updateDoctorProfile,
//   updateDoctorProfileImage,
// } from "../../store/doctorSlice";

// const DoctorProfileEditPage = () => {
//   const dispatch = useDispatch();
//   const { profile, error, loading } = useSelector((state) => state.doctor);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [specialty, setSpecialty] = useState("");
//   const [bio, setBio] = useState("");
//   const [profileImage, setProfileImage] = useState(null);
//   const [localImageUrl, setLocalImageUrl] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     dispatch(getDoctorProfile());
//   }, [dispatch]);

//   useEffect(() => {
//     if (profile) {
//       setName(profile.staff_name || "");
//       setEmail(profile.email || "");
//       setSpecialty(profile.specialty || "");
//       setBio(profile.bio || "");
//       setProfileImage(profile.profile_image || null);
//     }
//   }, [profile]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(
//         updateDoctorProfile({
//           staff_name: name,
//           email,
//           password,
//           specialty,
//           bio,
//         })
//       ).unwrap();
//       toast.success("Profile updated successfully");
//       setIsEditing(false);
//       setPassword(""); // Clear password field after update
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       toast.error("Failed to update profile. Please try again later.");
//     }
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       try {
//         const localUrl = URL.createObjectURL(file);
//         setLocalImageUrl(localUrl);

//         const result = await dispatch(updateDoctorProfileImage(file)).unwrap();

//         setProfileImage(result.profile_image);
//         toast.success("Profile image updated successfully");
//       } catch (error) {
//         console.error("Error uploading image:", error);
//         toast.error("Failed to update profile image. Please try again later.");
//         setLocalImageUrl(null);
//       }
//     }
//   };

//   const getCurrentImageUrl = () => {
//     if (localImageUrl) {
//       return localImageUrl;
//     } else if (profileImage) {
//       return `http://localhost:5000/${profileImage}`;
//     }
//     return "https://via.placeholder.com/150";
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="bg-blue-50 min-h-screen p-6">
//         <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="md:flex">
//             <div className="md:flex-shrink-0">
//               <div className="p-8">
//                 <div className="relative">
//                   <img
//                     src={getCurrentImageUrl()}
//                     alt="Profile"
//                     className="w-48 h-48 rounded-full object-cover border-4 border-blue-500"
//                   />
//                   <label
//                     htmlFor="profile-image-upload"
//                     className="absolute bottom-0 right-0 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors cursor-pointer"
//                   >
//                     <Camera size={24} />
//                   </label>
//                   <input
//                     id="profile-image-upload"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="hidden"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="p-8 md:flex-1">
//               <div className="flex items-center mb-6">
//                 <Link
//                   to="/home"
//                   className="text-blue-600 hover:text-blue-800 mr-4"
//                 >
//                   <ArrowLeft size={24} />
//                 </Link>
//                 <h2 className="text-3xl font-bold text-gray-800">
//                   Edit Doctor Profile
//                 </h2>
//               </div>

//               {error && <div className="text-red-500 mb-4">{error}</div>}

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                     disabled={!isEditing}
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                     disabled={!isEditing}
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="specialty"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Specialty
//                   </label>
//                   <input
//                     type="text"
//                     id="specialty"
//                     value={specialty}
//                     onChange={(e) => setSpecialty(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                     disabled={!isEditing}
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="bio"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Bio
//                   </label>
//                   <textarea
//                     id="bio"
//                     value={bio}
//                     onChange={(e) => setBio(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     rows="4"
//                     disabled={!isEditing}
//                   ></textarea>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="password"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     New Password
//                   </label>
//                   <input
//                     type="password"
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     disabled={!isEditing}
//                   />
//                 </div>

//                 <div className="flex justify-end space-x-4">
//                   {!isEditing ? (
//                     <button
//                       type="button"
//                       onClick={() => setIsEditing(true)}
//                       className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
//                     >
//                       <Stethoscope className="mr-2" size={20} />
//                       Edit Profile
//                     </button>
//                   ) : (
//                     <>
//                       <button
//                         type="button"
//                         onClick={() => setIsEditing(false)}
//                         className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center"
//                       >
//                         <Save className="mr-2" size={20} />
//                         Save Changes
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DoctorProfileEditPage;


import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Camera,
  Stethoscope,
  Save,
  User,
  Mail,
  Key,
  BookOpen,
  PenTool,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getDoctorProfile,
  updateDoctorProfile,
  updateDoctorProfileImage,
} from "../../store/doctorSlice";

const DoctorProfileEditPage = () => {
  const dispatch = useDispatch();
  const { profile, error, loading } = useSelector((state) => state.doctor);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [localImageUrl, setLocalImageUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(getDoctorProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setName(profile.staff_name || "");
      setEmail(profile.email || "");
      setSpecialty(profile.specialty || "");
      setBio(profile.bio || "");
      setProfileImage(profile.profile_image || null);
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateDoctorProfile({
          staff_name: name,
          email,
          password,
          specialty,
          bio,
        })
      ).unwrap();
      toast.success("Profile updated successfully");
      setIsEditing(false);
      setPassword("");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again later.");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const localUrl = URL.createObjectURL(file);
        setLocalImageUrl(localUrl);

        const result = await dispatch(updateDoctorProfileImage(file)).unwrap();

        setProfileImage(result.profile_image);
        toast.success("Profile image updated successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to update profile image. Please try again later.");
        setLocalImageUrl(null);
      }
    }
  };

  const getCurrentImageUrl = () => {
    if (localImageUrl) {
      return localImageUrl;
    } else if (profileImage) {
      return `http://localhost:5000/${profileImage}`;
    }
    return "https://via.placeholder.com/150";
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-white mt-20 min-h-screen p-6 font-serif">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="bg-[#1F2B6C] p-8 md:w-1/3">
              <Link
                to="/home"
                className="text-white hover:text-[#BFD2F8] mb-8 inline-block transition-colors"
              >
                <ArrowLeft size={24} />
              </Link>
              <div className="relative mb-8">
                <img
                  src={getCurrentImageUrl()}
                  alt="Profile"
                  className="w-48 h-48 mx-auto rounded-full object-cover border-4 border-[#BFD2F8] transition-all duration-300 hover:scale-105"
                />
                <label
                  htmlFor="profile-image-upload"
                  className="absolute bottom-0 right-1/4 bg-[#BFD2F8] text-[#1F2B6C] p-3 rounded-full hover:bg-white hover:text-[#1F2B6C] transition-colors cursor-pointer"
                >
                  <Camera size={24} />
                </label>
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <h2 className="text-2xl font-bold text-white text-center mb-4">
                {name}
              </h2>
              <p className="text-[#BFD2F8] text-center mb-8">{specialty}</p>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full py-2 px-4 bg-[#BFD2F8] text-[#1F2B6C] rounded-full font-bold hover:bg-white transition-colors flex items-center justify-center"
              >
                {isEditing ? (
                  <Save className="mr-2" size={20} />
                ) : (
                  <PenTool className="mr-2" size={20} />
                )}
                {isEditing ? "Save Profile" : "Edit Profile"}
              </button>
            </div>
            <div className="p-8 md:w-2/3">
              <h1 className="text-3xl font-bold text-[#1F2B6C] mb-8">
                Doctor Profile
              </h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center space-x-4">
                  <User size={24} className="text-[#1F2B6C]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-grow px-4 py-2 border-b-2 border-[#BFD2F8] focus:border-[#1F2B6C] outline-none transition-colors"
                    placeholder="Full Name"
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <Mail size={24} className="text-[#1F2B6C]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow px-4 py-2 border-b-2 border-[#BFD2F8] focus:border-[#1F2B6C] outline-none transition-colors"
                    placeholder="Email Address"
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <Stethoscope size={24} className="text-[#1F2B6C]" />
                  <input
                    type="text"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="flex-grow px-4 py-2 border-b-2 border-[#BFD2F8] focus:border-[#1F2B6C] outline-none transition-colors"
                    placeholder="Specialty"
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <Key size={24} className="text-[#1F2B6C]" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-grow px-4 py-2 border-b-2 border-[#BFD2F8] focus:border-[#1F2B6C] outline-none transition-colors"
                    placeholder="New Password"
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-start space-x-4">
                  <BookOpen size={24} className="text-[#1F2B6C] mt-2" />
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="flex-grow px-4 py-2 border-2 border-[#BFD2F8] focus:border-[#1F2B6C] outline-none transition-colors rounded-md"
                    placeholder="Bio"
                    rows="4"
                    disabled={!isEditing}
                  ></textarea>
                </div>
                {isEditing && (
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 border border-[#1F2B6C] text-[#1F2B6C] rounded-full hover:bg-[#1F2B6C] hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#1F2B6C] text-white rounded-full hover:bg-[#BFD2F8] hover:text-[#1F2B6C] transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorProfileEditPage;


// --------------ديززاين الي فوق خرافي--------------


// import React, { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   Camera,
//   Stethoscope,
//   Save,
//   User,
//   Mail,
//   Key,
//   BookOpen,
//   PenTool,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import {
//   getDoctorProfile,
//   updateDoctorProfile,
//   updateDoctorProfileImage,
// } from "../../store/doctorSlice";

// const DoctorProfileEditPage = () => {
//   const dispatch = useDispatch();
//   const { profile, error, loading } = useSelector((state) => state.doctor);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [specialty, setSpecialty] = useState("");
//   const [bio, setBio] = useState("");
//   const [profileImage, setProfileImage] = useState(null);
//   const [localImageUrl, setLocalImageUrl] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     dispatch(getDoctorProfile());
//   }, [dispatch]);

//   useEffect(() => {
//     if (profile) {
//       setName(profile.staff_name || "");
//       setEmail(profile.email || "");
//       setSpecialty(profile.specialty || "");
//       setBio(profile.bio || "");
//       setProfileImage(profile.profile_image || null);
//     }
//   }, [profile]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(
//         updateDoctorProfile({
//           staff_name: name,
//           email,
//           password,
//           specialty,
//           bio,
//         })
//       ).unwrap();
//       toast.success("Profile updated successfully");
//       setIsEditing(false);
//       setPassword("");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       toast.error("Failed to update profile. Please try again later.");
//     }
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       try {
//         const localUrl = URL.createObjectURL(file);
//         setLocalImageUrl(localUrl);

//         const result = await dispatch(updateDoctorProfileImage(file)).unwrap();

//         setProfileImage(result.profile_image);
//         toast.success("Profile image updated successfully");
//       } catch (error) {
//         console.error("Error uploading image:", error);
//         toast.error("Failed to update profile image. Please try again later.");
//         setLocalImageUrl(null);
//       }
//     }
//   };

//   const getCurrentImageUrl = () => {
//     if (localImageUrl) {
//       return localImageUrl;
//     } else if (profileImage) {
//       return `http://localhost:5000/${profileImage}`;
//     }
//     return "https://via.placeholder.com/150";
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className=" min-h-screen p-6 font-serif flex items-center justify-center">
//         <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="p-8">
//             <div className="flex justify-between items-center mb-8">
//               <Link
//                 to="/home"
//                 className="text-gray-600 hover:text-gray-800 transition-colors"
//               >
//                 <ArrowLeft size={24} />
//               </Link>
//               <h1 className="text-3xl font-bold text-[#1F2B6C]">
//                 Doctor Profile
//               </h1>
//               <button
//                 onClick={() => setIsEditing(!isEditing)}
//                 className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full font-semibold hover:bg-gray-200 transition-colors flex items-center"
//               >
//                 {isEditing ? (
//                   <Save className="mr-2" size={20} />
//                 ) : (
//                   <PenTool className="mr-2" size={20} />
//                 )}
//                 {isEditing ? "Save" : "Edit"}
//               </button>
//             </div>

//             <div className="flex flex-col items-center mb-8">
//               <div className="relative mb-4">
//                 <img
//                   src={getCurrentImageUrl()}
//                   alt="Profile"
//                   className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 transition-all duration-300 hover:scale-105"
//                 />
//                 <label
//                   htmlFor="profile-image-upload"
//                   className="absolute bottom-0 right-0 bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer shadow-md"
//                 >
//                   <Camera size={20} />
//                 </label>
//                 <input
//                   id="profile-image-upload"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="hidden"
//                 />
//               </div>
//               <h2 className="text-2xl font-bold text-[#1F2B6C] mb-2">{name}</h2>
//               <p className="text-gray-600">{specialty}</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="flex items-center space-x-4">
//                 <User size={24} className="text-gray-400" />
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="flex-grow px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
//                   placeholder="Full Name"
//                   disabled={!isEditing}
//                 />
//               </div>
//               <div className="flex items-center space-x-4">
//                 <Mail size={24} className="text-gray-400" />
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="flex-grow px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
//                   placeholder="Email Address"
//                   disabled={!isEditing}
//                 />
//               </div>
//               <div className="flex items-center space-x-4">
//                 <Stethoscope size={24} className="text-gray-400" />
//                 <input
//                   type="text"
//                   value={specialty}
//                   onChange={(e) => setSpecialty(e.target.value)}
//                   className="flex-grow px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
//                   placeholder="Specialty"
//                   disabled={!isEditing}
//                 />
//               </div>
//               <div className="flex items-center space-x-4">
//                 <Key size={24} className="text-gray-400" />
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="flex-grow px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
//                   placeholder="New Password"
//                   disabled={!isEditing}
//                 />
//               </div>
//               <div className="flex items-start space-x-4">
//                 <BookOpen size={24} className="text-gray-400 mt-2" />
//                 <textarea
//                   value={bio}
//                   onChange={(e) => setBio(e.target.value)}
//                   className="flex-grow px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
//                   placeholder="Bio"
//                   rows="4"
//                   disabled={!isEditing}
//                 ></textarea>
//               </div>
//               {isEditing && (
//                 <div className="flex justify-end space-x-4 mt-8">
//                   <button
//                     type="button"
//                     onClick={() => setIsEditing(false)}
//                     className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
//                   >
//                     Save Changes
//                   </button>
//                 </div>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DoctorProfileEditPage;
