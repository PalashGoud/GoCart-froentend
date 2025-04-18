import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '/src/images/logo.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginPanel, setShowLoginPanel] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-xl shadow-lg z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.img 
              src={logo} 
              alt="GoCart Logo" 
              className="h-10 w-auto" 
              initial={{ scale: 0.8 }} 
              animate={{ scale: 1 }} 
              transition={{ duration: 0.5 }}
            />
            <span className="text-2xl font-extrabold text-green-700">GoCart</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" text="Home" />
            <NavLink to="/" text="About" />
            <NavLink to="/" text="Contact" />
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLoginPanel(true)}
            className="hidden md:block px-6 py-2 bg-green-700 text-white rounded-xl shadow-md hover:bg-green-800 transition"
          >
            Login
          </motion.button>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-green-700" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white border-t shadow-lg rounded-b-xl"
            >
              <MobileNavLink to="/" text="Home" onClick={() => setIsOpen(false)} />
              <MobileNavLink to="/" text="About" onClick={() => setIsOpen(false)} />
              <MobileNavLink to="/" text="Contact" onClick={() => setIsOpen(false)} />
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowLoginPanel(true);
                }}
                className="w-full py-3 px-6 text-left text-green-700 hover:bg-green-100 transition"
              >
                Login
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Login Panel */}
      <AnimatePresence>
        {showLoginPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[999]"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-2xl bg-gradient-to-br from-green-700 to-green-500 text-white rounded-xl p-10 shadow-2xl relative"
            >
              <button
                onClick={() => setShowLoginPanel(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300"
              >
                <X size={24} />
              </button>
              <h2 className="text-3xl font-bold text-center mb-4">Welcome to GoCart</h2>
              <p className="text-center mb-6 max-w-md mx-auto text-white/90">
                Connecting Thela Vendors & Load Transporters directly to Consumers
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    navigate('/vendor-auth');
                    setShowLoginPanel(false);
                  }}
                  className="bg-white text-green-700 font-bold py-2 px-6 rounded-lg shadow hover:bg-gray-100 transition"
                >
                  Login as Vendor
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    navigate('/consumer-login');
                    setShowLoginPanel(false);
                  }}
                  className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg shadow hover:bg-yellow-500 transition"
                >
                  Login as Consumer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const NavLink = ({ to, text }) => (
  <Link to={to} className="text-gray-800 font-medium hover:text-green-700 transition duration-200">
    {text}
  </Link>
);

const MobileNavLink = ({ to, text, onClick }) => (
  <Link to={to} onClick={onClick} className="block py-3 px-6 text-gray-800 hover:bg-green-100 transition">
    {text}
  </Link>
);

export default Navbar;
