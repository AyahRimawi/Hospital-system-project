import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

const hospitalVideos = [
  {
    id: 1,
    name: "Hospital Overview",
    description:
      "Experience our state-of-the-art facilities and comprehensive care.",
    videoUrl: "/videos/welcome.mp4",
  },
  {
    id: 2,
    name: "Patient Care Excellence",
    description:
      "Discover our commitment to compassionate, personalized patient care.",
    videoUrl: "/videos/patient-care.mp4",
  },
  {
    id: 3,
    name: "Meet Our Expert Team",
    description:
      "Get to know our world-class medical professionals dedicated to your health.",
    videoUrl: "/videos/meet-doctors.mp4",
  },
];

const HospitalVideos = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="bg-[#f6f5f2] py-8 px-4 sm:px-6 lg:px-8 font-serif relative overflow-hidden">
      <motion.h2
        className="text-4xl font-extrabold text-[#05464e] mb-6 text-center md:mb-16"
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Discover Our Hospital
      </motion.h2>
      <div className=" mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-28">
        {hospitalVideos.map((video, index) => (
          <motion.div
            key={video.id}
            className="group relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <video
                src={video.videoUrl}
                className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-500"
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100 group-hover:opacity-40 transition-opacity duration-300" />
              <div className="absolute inset-0 flex flex-col justify-end p-3">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:mb-2 transition-all duration-300">
                  {video.name}
                </h3>
                <p className="text-sm text-white text-opacity-0 group-hover:text-opacity-100 transition-all duration-300">
                  {video.description}
                </p>
              </div>
              <motion.button
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedVideo(video)}
              >
                <Play className="w-4 h-4 text-[#04333a]" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-3xl mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <video
                src={selectedVideo.videoUrl}
                className="w-full rounded-lg shadow-xl"
                controls
                autoPlay
              />
              <button
                className="absolute top-2 right-2 text-white hover:text-[#e6f0f5] transition-colors duration-300"
                onClick={() => setSelectedVideo(null)}
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HospitalVideos;
