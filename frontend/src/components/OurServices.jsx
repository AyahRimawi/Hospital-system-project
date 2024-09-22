import React from "react";
import { motion } from "framer-motion";

const ServicesSection = () => {
  const services = [
    {
      title: "Heart Disease",
      description: " Specialized care for cardiovascular health",
      image:
        "https://demo.freaktemplate.com/singleclinic/public/upload/service/service_451010.png",
    },
    {
      title: "Dental Care",
      description: "Complete oral health services",
      image:
        "https://demo.freaktemplate.com/singleclinic/public/upload/service/service_440329.png",
    },
    {
      title: "Neurology Surgery",
      description: "Expert treatment for neurological conditions.",
      image:
        "https://demo.freaktemplate.com/singleclinic/public/upload/service/service_906074.png",
    },
    {
      title: "Laboratory services",
      description: "Accurate diagnostics through lab testing",
      image:
        "https://demo.freaktemplate.com/singleclinic/public/upload/service/service_335711.png",
    },
    {
      title: "Body Surgery",
      description: "Surgical solutions for various bodily issues.",
      image:
        "https://demo.freaktemplate.com/singleclinic/public/upload/service/service_255652.png",
    },

    {
      title: "Gynaecology",
      description: "Comprehensive care for women's health.",
      image:
        "https://demo.freaktemplate.com/singleclinic/public/upload/service/service_638132.png",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-[#f6f5f2] font-serif">
      <div className="container mx-auto flex flex-col md:flex-row">
        <div className="md:w-1/3 mb-8 md:mb-0 ">
          <div className="relative h-64 md:h-full mt-4 md:mt-16">
            <img
              src="https://i.imgur.com/T7w58X6.png"
              alt="Doctor"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
        <div className="md:w-2/3 md:pl-8">
          <h2
            className="text-4xl font-extrabold text-[#05464e] mb-6 text-center md:text-left md:mb-16"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          >
            Our Medical Services
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-[#e6f0f5] rounded-lg p-6 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                  <img
                    src={service.image}
                    alt={`${service.title} Icon`}
                    className="w-full h-full  object-contain"
                  />
                </div>
                <h4 className="text-[#05464e] font-semibold mb-2">
                  {service.title}
                </h4>
                <p className="text-[12px]">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
