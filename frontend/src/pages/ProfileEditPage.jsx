import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Camera,
  User,
  Mail,
  Key,
  PenTool,
  Save,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  updateProfile,
  updateProfileImage,
} from "../store/authSlice";
import Swal from "sweetalert2";

// Custom Sweetalert2 styling
// Updated Sweetalert2 styling
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
  customClass: {
    popup: "font-serif text-sm",
    title: "text-[#05464e]",
    content: "text-[#05464e]",
  },
  background: "#e6f0f5",
  color: "#05464e",
});

const ProfileEditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [localImageUrl, setLocalImageUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(getProfile())
      .unwrap()
      .then((userData) => {
        setName(userData.username || "");
        setEmail(userData.email || "");
        setProfileImage(userData.profile_image || null);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        Toast.fire({
          icon: "error",
          title: "Failed to fetch profile data",
        });
      });
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateProfile({ username: name, email, password })
      ).unwrap();
      Toast.fire({
        icon: "success",
        title: "Profile updated successfully",
      });
      setIsEditing(false);
      setPassword("");
    } catch (error) {
      console.error("Error updating profile:", error);
      Toast.fire({
        icon: "error",
        title: "Failed to update profile",
      });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const localUrl = URL.createObjectURL(file);
        setLocalImageUrl(localUrl);

        const result = await dispatch(updateProfileImage(file)).unwrap();

        setProfileImage(result.profile_image);

        Toast.fire({
          icon: "success",
          title: "Profile image updated successfully",
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        Toast.fire({
          icon: "error",
          title: "Failed to update profile image",
        });
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
      <Navbar />
      <div className="bg-white mt-20 min-h-screen p-6 font-serif">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="bg-[#04333a] p-8 md:w-1/3">
              <Link
                to="/"
                className="text-white hover:text-[#e6f0f5] mb-8 inline-block transition-colors"
              >
                <ArrowLeft size={24} />
              </Link>
              <div className="relative mb-8">
                <img
                  src={getCurrentImageUrl()}
                  alt="Profile"
                  className="w-48 h-48 mx-auto rounded-full object-cover border-4 border-[#e6f0f5] transition-all duration-300 hover:scale-105"
                />
                <label
                  htmlFor="profile-image-upload"
                  className="absolute bottom-0 right-1/4 bg-[#e6f0f5] text-[#05464e] p-3 rounded-full hover:bg-white hover:text-[#05464e] transition-colors cursor-pointer"
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
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full py-2 px-4 bg-[#e6f0f5] text-[#05464e] rounded-full font-bold hover:bg-white transition-colors flex items-center justify-center"
              >
                {isEditing ? (
                  <>
                    <Save className="mr-2" size={20} />
                    Save Profile
                  </>
                ) : (
                  <>
                    <PenTool className="mr-2" size={20} />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
            <div className="p-8 md:w-2/3">
              <h1 className="text-3xl font-bold text-[#05464e] mb-8">
                User Profile
              </h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center space-x-4">
                  <User size={24} className="text-[#05464e]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-grow px-4 py-2 border-b-2 border-[#e6f0f5] focus:border-[#05464e] outline-none transition-colors"
                    placeholder="Full Name"
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <Mail size={24} className="text-[#05464e]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow px-4 py-2 border-b-2 border-[#e6f0f5] focus:border-[#05464e] outline-none transition-colors"
                    placeholder="Email Address"
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <Key size={24} className="text-[#05464e]" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-grow px-4 py-2 border-b-2 border-[#e6f0f5] focus:border-[#05464e] outline-none transition-colors"
                    placeholder="New Password"
                    disabled={!isEditing}
                  />
                </div>
                {isEditing && (
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 border border-[#05464e] text-[#05464e] rounded-full hover:bg-[#05464e] hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#05464e] text-white rounded-full hover:bg-[#e6f0f5] hover:text-[#05464e] transition-colors"
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
      <Footer />
    </>
  );
};

export default ProfileEditPage;