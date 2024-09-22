import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const API_BASE_URL = "http://localhost:5000";

const Feedback = () => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/feedback`);
      setFeedbacks(response.data.feedbacks || []);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      setError("Failed to load feedbacks. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/feedback`, { content, rating });
      setContent("");
      setRating(5);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Feedback submitted successfully!",
      });
      fetchFeedbacks();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while submitting feedback. Please try again.",
      });
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Feedback</h1>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Your Feedback
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex">
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                      className="hidden"
                    />
                    <FaStar
                      className="cursor-pointer"
                      color={
                        ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                      }
                      size={30}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Feedback
          </button>
        </form>

        <h2 className="text-2xl font-bold mb-4">Previous Feedback</h2>

        {isLoading ? (
          <p>Loading feedback...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : feedbacks.length === 0 ? (
          <p>No feedback available.</p>
        ) : (
          <ul className="space-y-4">
            {feedbacks.map((feedback, index) => (
              <li
                key={index}
                className="bg-white shadow overflow-hidden sm:rounded-lg"
              >
                <div className="px-4 py-5 sm:px-6">
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {feedback.content}
                  </p>
                  <div className="mt-2 flex items-center">
                    {[...Array(5)].map((star, i) => (
                      <FaStar
                        key={i}
                        color={i < feedback.rating ? "#ffc107" : "#e4e5e9"}
                        size={20}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      By: {feedback.username}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {new Date(feedback.created_at).toLocaleDateString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Feedback;