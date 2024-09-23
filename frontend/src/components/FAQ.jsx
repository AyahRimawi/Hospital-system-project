import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Heart,
  Shield,
  Activity,
  UserPlus,
  Thermometer,
  Brain,
} from "lucide-react";

const FAQSection = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: "What are the symptoms of the flu?",
      answer:
        "Common symptoms of the flu include fever, cough, sore throat, body aches, and fatigue.",
      icon: Thermometer,
    },
    {
      question: "How can I prevent illness?",
      answer:
        "To prevent illness, wash your hands regularly, avoid close contact with sick individuals, and get necessary vaccinations.",
      icon: Shield,
    },
    {
      question: "When should I see a doctor?",
      answer:
        "You should see a doctor if you have persistent symptoms, severe pain, or if your condition worsens.",
      icon: UserPlus,
    },
    {
      question: "What vaccinations do adults need?",
      answer:
        "Adults should stay updated on vaccinations such as the flu shot, tetanus, and others based on their health history.",
      icon: Activity,
    },
    {
      question: "What is high blood pressure?",
      answer:
        "High blood pressure, or hypertension, is a condition where the force of blood against the artery walls is too high.",
      icon: Heart,
    },
    {
      question: "How can I manage stress effectively?",
      answer:
        "Effective stress management techniques can include exercise, meditation, talking to a friend, or seeking professional help.",
      icon: Brain,
    },
  ];

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-[#f6f5f2] font-serif">
      <div className="container mx-auto">
        <h2 className="text-4xl font-extrabold text-[#04333a] mb-12 text-center">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <motion.div
                className="p-6 cursor-pointer flex items-center justify-between"
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
                whileHover={{ backgroundColor: "#e6f0f5" }}
              >
                <div className="flex items-center">
                  <item.icon className="w-6 h-6 text-[#04333a] mr-4" />
                  <h3 className="text-lg font-semibold text-[#04333a]">
                    {item.question}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#04333a] transition-transform duration-300 ${
                    expandedIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </motion.div>
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-600">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
