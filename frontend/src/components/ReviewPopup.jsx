import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitReview, clearMessage } from "../store/reviewSlice";
import { X, Star, CheckCircle, Loader } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// Custom Alert component
const CustomAlert = ({ children }) => (
  <div className="bg-[#e6f0f5] border-l-4 border-[#05464e] text-[#05464e] p-4 rounded-md shadow-md flex items-center space-x-2">
    <CheckCircle className="w-5 h-5 flex-shrink-0" />
    <div>{children}</div>
  </div>
);

const ReviewPopup = ({ onClose, appointmentId }) => {
  const dispatch = useDispatch();
  const { status, message } = useSelector((state) => state.review);
  const [rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    const fetchDoctorName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/appointment/doctor/${appointmentId}`
        );
        setDoctorName(response.data.staff_name);
      } catch (error) {
        console.error("Error fetching doctor name:", error);
      }
    };

    fetchDoctorName();
    return () => dispatch(clearMessage());
  }, [appointmentId, dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      setShowNotification(true);
      setTimeout(() => onClose(), 2000);
    }
  }, [status, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status !== "loading") {
      dispatch(
        submitReview({ rating, reviewContent, appointment_id: appointmentId })
      );
    }
  };

  const handleClose = () => {
    dispatch(clearMessage());
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative overflow-hidden font-serif"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute top-0 left-0 w-full h-2 bg-[#05464e]"
          />
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-[#05464e] mb-6">
            Your Feedback Matters
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <p className="text-md font-medium text-[#05464e] mb-2">
                How was your appointment with {doctorName}?
              </p>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="focus:outline-none transition-colors"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= (hoverRating || rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
            </div>
            <div>
              <label
                htmlFor="review"
                className="block text-sm font-medium text-[#05464e] mb-2"
              >
                Your Review
              </label>
              <textarea
                id="review"
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#05464e] focus:border-transparent bg-white text-gray-800 resize-none transition-all duration-200"
                rows="4"
                required
                placeholder="Share your experience..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-[#05464e] bg-white hover:bg-[#e6f0f5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#05464e] transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === "loading" || rating === 0}
                className={`px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-200 ${
                  status === "loading" || rating === 0
                    ? "bg-[#05464e] opacity-50 cursor-not-allowed"
                    : "bg-[#05464e] hover:bg-[#03292f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#05464e]"
                }`}
              >
                {status === "loading" ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  "Submit Review"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-5 right-5 max-w-sm"
          >
            <CustomAlert>
              {message || "Review submitted successfully!"}
            </CustomAlert>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default ReviewPopup;
