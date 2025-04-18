import React from "react";
import { motion } from "framer-motion";
import { FaTruck, FaShoppingBasket, FaMapMarkerAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaTruck className="text-green-600 text-4xl" />,
    title: "Fast & Reliable Delivery",
    description: "Get fresh fruits, vegetables, and groceries delivered to your doorstep quickly.",
  },
  {
    icon: <FaShoppingBasket className="text-blue-600 text-4xl" />,
    title: "Easy Vendor Onboarding",
    description: "Street vendors can list their items and start selling online in just a few steps.",
  },
  {
    icon: <FaMapMarkerAlt className="text-red-600 text-4xl" />,
    title: "Real-time Location Tracking",
    description: "Track vendors and transporters in real-time for a seamless experience.",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-white via-gray-100 to-white text-center">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
      >
        Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">GoCart?</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-gray-600 max-w-2xl mx-auto mb-12 text-base md:text-lg"
      >
        We connect vendors, consumers, and transporters with a seamless digital experience — fast, easy, and efficient.
      </motion.p>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="p-6 bg-white rounded-xl shadow-xl border border-gray-100 flex flex-col items-center text-center transition-all duration-300"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
