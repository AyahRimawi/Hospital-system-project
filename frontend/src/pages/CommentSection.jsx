// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Comment = ({
//   comment,
//   addReply,
//   updateComment,
//   deleteComment,
//   currentUserId,
// }) => {
//   const [showReplyForm, setShowReplyForm] = useState(false);
//   const [replyText, setReplyText] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [editText, setEditText] = useState(comment.comment_text);
//   const [isExpanded, setIsExpanded] = useState(false);

//   const handleSubmitReply = (e) => {
//     e.preventDefault();
//     addReply(replyText, comment.comment_id);
//     setReplyText("");
//     setShowReplyForm(false);
//   };

//   const handleSubmitEdit = (e) => {
//     e.preventDefault();
//     updateComment(comment.comment_id, editText);
//     setIsEditing(false);
//   };

//   const handleDelete = () => {
//     deleteComment(comment.comment_id);
//   };

//   return (
//     <div className="border-l-2 border-blue-300 pl-4 mb-4 transition-all duration-300 ease-in-out">
//       <div className="flex items-center mb-2">
//         <img
//           src={
//             `http://localhost:5000/${comment.profile_image}` ||
//             "/default-avatar.png"
//           }
//           alt="Profile"
//           className="w-10 h-10 rounded-full border-2 border-blue-500 transition-transform duration-300 hover:scale-110"
//         />
//         <p className="font-semibold ml-2 text-blue-600">{comment.username}</p>
//       </div>
//       {isEditing ? (
//         <form onSubmit={handleSubmitEdit} className="mt-2">
//           <textarea
//             value={editText}
//             onChange={(e) => setEditText(e.target.value)}
//             className="w-full p-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//             rows="2"
//           />
//           <div className="flex mt-2">
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
//             >
//               Save Edit
//             </button>
//             <button
//               onClick={() => setIsEditing(false)}
//               className="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors duration-300"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       ) : (
//         <p className="text-gray-700">{comment.comment_text}</p>
//       )}
//       <div className="mt-2 flex items-center">
//         <button
//           onClick={() => setShowReplyForm(!showReplyForm)}
//           className="text-blue-500 hover:text-blue-700 transition-colors duration-300 mr-2"
//         >
//           Reply
//         </button>
//         {currentUserId === comment.patient_id && (
//           <>
//             <button
//               onClick={() => setIsEditing(true)}
//               className="text-green-500 hover:text-green-700 transition-colors duration-300 mr-2"
//             >
//               Edit
//             </button>
//             <button
//               onClick={handleDelete}
//               className="text-red-500 hover:text-red-700 transition-colors duration-300"
//             >
//               Delete
//             </button>
//           </>
//         )}
//       </div>
//       {showReplyForm && (
//         <form onSubmit={handleSubmitReply} className="mt-2">
//           <textarea
//             value={replyText}
//             onChange={(e) => setReplyText(e.target.value)}
//             className="w-full p-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//             rows="2"
//           />
//           <button
//             type="submit"
//             className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
//           >
//             Submit Reply
//           </button>
//         </form>
//       )}
//       {comment.replies && comment.replies.length > 0 && (
//         <div className="mt-2">
//           <button
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
//           >
//             {isExpanded
//               ? "Hide Replies"
//               : `Show ${comment.replies.length} Replies`}
//           </button>
//           {isExpanded && (
//             <div className="mt-2 pl-4 border-l-2 border-blue-200">
//               {comment.replies.map((reply) => (
//                 <Comment
//                   key={reply.comment_id}
//                   comment={reply}
//                   addReply={addReply}
//                   updateComment={updateComment}
//                   deleteComment={deleteComment}
//                   currentUserId={currentUserId}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// const CommentSection = ({
//   comments,
//   addComment,
//   updateComment,
//   deleteComment,
//   currentUserId,
// }) => {
//   const [commentText, setCommentText] = useState("");

//   const handleSubmitComment = (e) => {
//     e.preventDefault();
//     addComment(commentText);
//     setCommentText("");
//   };

//   const renderComments = (commentsArray) => {
//     const topLevelComments = commentsArray.filter(
//       (comment) => !comment.parent_comment_id
//     );
//     const commentMap = commentsArray.reduce((acc, comment) => {
//       acc[comment.comment_id] = comment;
//       return acc;
//     }, {});
//     topLevelComments.forEach((comment) => {
//       comment.replies = commentsArray.filter(
//         (reply) => reply.parent_comment_id === comment.comment_id
//       );
//     });
//     return topLevelComments.map((comment) => (
//       <Comment
//         key={comment.comment_id}
//         comment={comment}
//         addReply={addComment}
//         updateComment={updateComment}
//         deleteComment={deleteComment}
//         currentUserId={currentUserId}
//       />
//     ));
//   };

//   return (
//     <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
//       <h2 className="text-2xl font-bold mb-4 text-blue-600">Comments</h2>
//       <form onSubmit={handleSubmitComment} className="mb-6">
//         <textarea
//           value={commentText}
//           onChange={(e) => setCommentText(e.target.value)}
//           className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//           rows="3"
//           placeholder="Write your comment here..."
//         />
//         <button
//           type="submit"
//           className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
//         >
//           Submit Comment
//         </button>
//       </form>
//       <div className="space-y-4">{renderComments(comments)}</div>
//     </div>
//   );
// };

// export default CommentSection;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaReply,
  FaEdit,
  FaTrash,
  FaComments,
  FaPaperPlane,
} from "react-icons/fa";

const Comment = ({
  comment,
  addReply,
  updateComment,
  deleteComment,
  currentUserId,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.comment_text);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmitReply = (e) => {
    e.preventDefault();
    addReply(replyText, comment.comment_id);
    setReplyText("");
    setShowReplyForm(false);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    updateComment(comment.comment_id, editText);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteComment(comment.comment_id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="border-l-2 border-[#04333a] pl-4 mb-6 transition-all duration-300 ease-in-out"
    >
      <div className="flex items-center mb-3">
        <img
          src={
            `http://localhost:5000/${comment.profile_image}` ||
            "/default-avatar.png"
          }
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-[#04333a] transition-transform duration-300 hover:scale-110 object-cover"
        />
        <p className="font-semibold ml-3 text-[#04333a]">{comment.username}</p>
      </div>
      {isEditing ? (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmitEdit}
          className="mt-3"
        >
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-3 border-2 border-[#e6f0f5] rounded-lg focus:ring-2 focus:ring-[#04333a] focus:border-transparent transition-all duration-300 bg-white text-[#04333a]"
            rows="3"
          />
          <div className="flex mt-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-4 py-2 bg-[#04333a] text-white rounded-full hover:bg-opacity-90 transition-colors duration-300 flex items-center"
            >
              <FaEdit className="mr-2" /> Save Edit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(false)}
              className="ml-3 px-4 py-2 bg-[#e6f0f5] text-[#04333a] rounded-full hover:bg-opacity-90 transition-colors duration-300 flex items-center"
            >
              Cancel
            </motion.button>
          </div>
        </motion.form>
      ) : (
        <p className="text-[#04333a] bg-[#e6f0f5] p-3 rounded-lg">
          {comment.comment_text}
        </p>
      )}
      <div className="mt-3 flex items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="text-[#04333a] hover:text-opacity-80 transition-colors duration-300 mr-3 flex items-center"
        >
          <FaReply className="mr-1" /> Reply
        </motion.button>
        {currentUserId === comment.patient_id && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              className="text-[#04333a] hover:text-opacity-80 transition-colors duration-300 mr-3 flex items-center"
            >
              <FaEdit className="mr-1" /> Edit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 transition-colors duration-300 flex items-center"
            >
              <FaTrash className="mr-1" /> Delete
            </motion.button>
          </>
        )}
      </div>
      <AnimatePresence>
        {showReplyForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmitReply}
            className="mt-3"
          >
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full p-3 border-2 border-[#e6f0f5] rounded-lg focus:ring-2 focus:ring-[#04333a] focus:border-transparent transition-all duration-300 bg-white text-[#04333a]"
              rows="3"
              placeholder="Write your reply here..."
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="mt-2 px-4 py-2 bg-[#04333a] text-white rounded-full hover:bg-opacity-90 transition-colors duration-300 flex items-center"
            >
              <FaPaperPlane className="mr-2" /> Submit Reply
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#04333a] hover:text-opacity-80 transition-colors duration-300 flex items-center"
          >
            <FaComments className="mr-2" />
            {isExpanded
              ? "Hide Replies"
              : `Show ${comment.replies.length} Replies`}
          </motion.button>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pl-4 border-l-2 border-[#e6f0f5]"
              >
                {comment.replies.map((reply) => (
                  <Comment
                    key={reply.comment_id}
                    comment={reply}
                    addReply={addReply}
                    updateComment={updateComment}
                    deleteComment={deleteComment}
                    currentUserId={currentUserId}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

const CommentSection = ({
  comments,
  addComment,
  updateComment,
  deleteComment,
  currentUserId,
}) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmitComment = (e) => {
    e.preventDefault();
    addComment(commentText);
    setCommentText("");
  };

  const renderComments = (commentsArray) => {
    const topLevelComments = commentsArray.filter(
      (comment) => !comment.parent_comment_id
    );
    const commentMap = commentsArray.reduce((acc, comment) => {
      acc[comment.comment_id] = comment;
      return acc;
    }, {});
    topLevelComments.forEach((comment) => {
      comment.replies = commentsArray.filter(
        (reply) => reply.parent_comment_id === comment.comment_id
      );
    });
    return topLevelComments.map((comment) => (
      <Comment
        key={comment.comment_id}
        comment={comment}
        addReply={addComment}
        updateComment={updateComment}
        deleteComment={deleteComment}
        currentUserId={currentUserId}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 bg-white rounded-lg shadow-xl p-6 border border-[#e6f0f5]"
    >
      <h2 className="text-3xl font-bold mb-6 text-[#04333a] flex items-center">
        <FaComments className="mr-3" /> Patient Feedback
      </h2>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmitComment}
        className="mb-8"
      >
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full p-4 border-2 border-[#e6f0f5] rounded-lg focus:ring-2 focus:ring-[#04333a] focus:border-transparent transition-all duration-300 bg-white text-[#04333a]"
          rows="4"
          placeholder="Share your thoughts or experiences..."
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="mt-3 px-6 py-3 bg-[#04333a] text-white rounded-full hover:bg-opacity-90 transition-colors duration-300 flex items-center"
        >
          <FaPaperPlane className="mr-2" /> Submit Comment
        </motion.button>
      </motion.form>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="space-y-6"
      >
        {renderComments(comments)}
      </motion.div>
    </motion.div>
  );
};

export default CommentSection;