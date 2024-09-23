// // HeroSection.jsx
// import React from 'react';

// const HeroSection = () => {
//   return (
//     <section className="relative bg-gray-800 text-white">
//       <div className="absolute inset-0">
//         <img
//           src="https://via.placeholder.com/1920x800"
//           alt="Hero Background"
//           className="w-full h-full object-cover opacity-60"
//         />
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//       </div>
//       <div className="relative container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
//         <h1 className="text-4xl md:text-5xl font-bold mb-4">
//           Welcome to Our Website
//         </h1>
//         <p className="text-lg md:text-2xl mb-8">
//           We provide exceptional care and services tailored to your needs.
//         </p>
//         <a
//           href="/contact"
//           className="bg-blue-500 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300"
//         >
//           Get Started
//         </a>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;


// import React from "react";
// import { motion } from "framer-motion";

// // Hero Section Component
// const HeroSection = () => {
//   return (
//     <motion.section
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1 }}
//       className="relative h-dvh flex items-center justify-center overflow-hidden"
//     >
//       <div className="absolute inset-0 z-0">
//         <img
//           src="https://i.imgur.com/IQkSnBK.png"
//           className="w-full h-96 object"
//         />
//       </div>
//       <div className="relative z-10 text-center text-white">
//         <motion.h1
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//           className="text-5xl font-bold mb-4"
//         >
//           Book Your Medical Appointment
//         </motion.h1>
//         <motion.p
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.7, duration: 0.8 }}
//           className="text-xl mb-8"
//         >
//           Quick, easy, and convenient scheduling with top doctors
//         </motion.p>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-[#05464e] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#05464e]/90 transition duration-300"
//         >
//           Get Started
//         </motion.button>
//       </div>
//     </motion.section>
//   );
// };
// export default HeroSection;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const images = [
    "https://i.imgur.com/DWvfGPl.png",
    "https://i.imgur.com/IQkSnBK.png",
    "https://i.imgur.com/4onXGUw.png",
    "https://i.imgur.com/u8JxI67.png",
    "https://i.imgur.com/wlvgquI.png",
  ];

  return (
    <section className="relative h-svh overflow-hidden font-serif">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        effect="fade"
        loop
        className="h-full w-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <img
                src={img}
                alt={`Medical slide ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-45" />
              <div className="absolute inset-0 flex items-center justify-center font-serif">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-center text-white px-4"
                >
                  <h3 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
                    Exceptional healthcare{" "}
                  </h3>
                  <p className="text-xl mb-8 max-w-2xl mx-auto">
                    Experience top-notch medical services with our expert
                    doctors.{" "}
                  </p>
                  <Link to={"/doctor"}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-[#05464e] px-28 py-3 md:mt-3 rounded-full text-lg font-semibold hover:bg-[#e6f0f5] transition duration-300"
                    >
                      Book your appointment now{" "}
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;