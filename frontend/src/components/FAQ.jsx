import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

// FAQ Section Component
const FAQSection = () => {
  const faqs = [
    {
      question: "What are the symptoms of the flu?",
      answer:
        "Common symptoms of the flu include fever, cough, sore throat, body aches, and fatigue.",
    },
    {
      question: "How can I prevent getting sick?",
      answer:
        "To prevent illness, wash your hands frequently, avoid close contact with sick individuals, and get vaccinated.",
    },
    {
      question: "When should I see a doctor?",
      answer:
        "You should see a doctor if you experience persistent symptoms, severe pain, or if your condition worsens.",
    },
    {
      question: "What vaccinations do adults need?",
      answer:
        "Adults should stay up-to-date with vaccinations like the flu shot, Tdap, and others based on their health history.",
    },
    {
      question: "What is high blood pressure?",
      answer:
        "High blood pressure, or hypertension, is a condition where the force of the blood against the artery walls is too high.",
    },
    {
      question: "How do I manage stress effectively?",
      answer:
        "Managing stress can involve exercise, meditation, talking to a friend, or seeking professional help.",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-[#f6f5f2] font-serif">
      <div className="container mx-auto ">
        <h2
          className="text-4xl font-extrabold text-[#05464e] mb-6 text-center md:mb-16"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faqs.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.03 }}
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#05464e] mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
