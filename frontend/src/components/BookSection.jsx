import React from "react";

// Call to Action Section Component
const BookSection = () => {
  return (
    <div className="w-full h-full">
      <section className="relative py-24 w-full h-[400px]">
        <div className="absolute inset-0 z-0 w-full h-full">
          <img
            src="https://i.imgur.com/yPDYlhZ.png"
            alt="CTA background"
            className="w-full h-full object-fill"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 flex items-center font-serif">
          <div className="w-full md:w-1/2 text-white">
            <h2 className="text-4xl font-bold mb-4 text-center md:ml-[-265px]">
              Ready to Book Your
            </h2>
            <h2 className="text-4xl font-bold mb-4 text-center md:ml-[-265px]">
              {" "}
              Appointment?
            </h2>

            <button className="bg-white text-[#05464e] px-28 py-3 md:mt-8 rounded-full text-lg font-semibold hover:bg-[#e6f0f5] transition duration-300">
              Book Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookSection;
