import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Amit Sharma",
    text: "GoCart has completely changed how I order veggies. Fast delivery and trusted vendors!",
    rating: 5,
  },
  {
    name: "Priya Verma",
    text: "Loved how easy it was to find local sellers. Great for both buyers and vendors!",
    rating: 4,
  },
  {
    name: "Rajeev Singh",
    text: "Best experience! I placed my order and it arrived fresh and quick.",
    rating: 5,
  },
];

const Reviews = () => {
  return (
    <section className="bg-green-700 py-20 px-6 text-center">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
      >
        What Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">Users Say</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-gray-300 max-w-2xl mx-auto mb-12"
      >
        Real feedback from people using GoCart daily.
      </motion.p>

      {/* Reviews Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.04 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="bg-gray-50 rounded-xl shadow-md p-6 border border-gray-100"
          >
            <div className="flex justify-center mb-4">
              {[...Array(review.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 mx-0.5" />
              ))}
            </div>
            <p className="text-gray-700 italic mb-4">"{review.text}"</p>
            <h3 className="text-lg font-semibold text-gray-900">{review.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
