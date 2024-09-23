// // Footer.js
// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-gray-300 py-8">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           {/* Website Name */}
//           <div className="text-xl font-bold text-white mb-4 md:mb-0">
//             WebsiteName
//           </div>

//           {/* Links */}
//           <div className="flex space-x-6 mb-4 md:mb-0">
//             <a href="/" className="hover:text-white">Home</a>
//             <a href="/about" className="hover:text-white">About</a>
//             <a href="/contact" className="hover:text-white">Contact</a>
//             <a href="/doctor" className="hover:text-white">Our Doctor</a>
//           </div>

//           {/* Social Icons */}
//           <div className="flex space-x-4">
//             <a href="https://facebook.com" className="hover:text-white">
//               <i className="fab fa-facebook-f"></i> {/* Font Awesome Icon */}
//             </a>
//             <a href="https://twitter.com" className="hover:text-white">
//               <i className="fab fa-twitter"></i> {/* Font Awesome Icon */}
//             </a>
//             <a href="https://instagram.com" className="hover:text-white">
//               <i className="fab fa-instagram"></i> {/* Font Awesome Icon */}
//             </a>
//             <a href="https://linkedin.com" className="hover:text-white">
//               <i className="fab fa-linkedin-in"></i> {/* Font Awesome Icon */}
//             </a>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="text-center mt-8">
//           <p className="text-sm text-gray-400">
//             &copy; {new Date().getFullYear()} WebsiteName. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#04333a] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">MediBook</h3>
            <p>Your trusted platform for medical appointments.</p>
          </div>
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul>
              <li>
                <a href="#" className="hover:text-[#e6f0f5]">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#e6f0f5]">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#e6f0f5]">
                  Doctors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#e6f0f5]">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p>123 Medical Street</p>
            <p>City, Country 12345</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@medibook.com</p>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#e6f0f5]">
                Facebook
              </a>
              <a href="#" className="hover:text-[#e6f0f5]">
                Twitter
              </a>
              <a href="#" className="hover:text-[#e6f0f5]">
                Instagram
              </a>
              <a href="#" className="hover:text-[#e6f0f5]">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p>&copy; 2024 MediBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
