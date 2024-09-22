import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./sidebar";

const API_BASE_URL = "http://localhost:5000";

const AdminFeedback = () => {
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
      setFeedbacks(response.data.feedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      setError("Failed to load feedbacks. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFeedbackStatus = async (feedbackId, currentStatus) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/feedback/admin/feedbacks/${feedbackId}`,
        {
          is_deleted: !currentStatus,
        }
      );

      if (response.data.success) {
        const updatedFeedbacks = feedbacks.map((feedback) =>
          feedback.id === feedbackId
            ? { ...feedback, is_deleted: !currentStatus }
            : feedback
        );
        setFeedbacks(updatedFeedbacks);

        Swal.fire({
          icon: "success",
          title: "Updated Successfully",
          text: `The feedback has been ${
            !currentStatus ? "deleted" : "restored"
          } successfully.`,
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error updating feedback status:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating the feedback status.",
        confirmButtonText: "OK",
      });
    }
  };

  if (isLoading) return <div className="ml-64 p-4">Loading...</div>;
  if (error) return <div className="ml-64 p-4">{error}</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-4">
        <h1 className="text-2xl font-bold mb-4">Feedback Management</h1>
        <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Content</th>
              <th className="py-2 px-4 border-b">Rating</th>
              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{feedback.username}</td>
                <td className="py-2 px-4 border-b">{feedback.content}</td>
                <td className="py-2 px-4 border-b">{feedback.rating}/5</td>
                <td className="py-2 px-4 border-b">
                  {new Date(feedback.created_at).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {feedback.is_deleted ? "Deleted" : "Active"}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() =>
                      toggleFeedbackStatus(feedback.id, feedback.is_deleted)
                    }
                    className={`px-4 py-2 rounded ${
                      feedback.is_deleted
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white`}
                  >
                    {feedback.is_deleted ? "Restore" : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFeedback;