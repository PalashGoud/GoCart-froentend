// src/pages/ConsumerLogin.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header2 from "../components/Header2";

const ConsumerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mobile_number: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [serverOtp, setServerOtp] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://gocart-gqbi.onrender.com/consumers/login", formData)
      .then((res) => {
        const consumer = res.data.data;
        localStorage.setItem("consumer_id", JSON.stringify(consumer._id));
        localStorage.setItem("consumer_mobile", consumer.mobile_number);
        alert("Login Successful!");
        navigate("/cusord");
      })
      .catch((err) => {
        console.error(err);
        alert("Login failed. Please try again.");
      });
  };

  const sendOtp = () => {
    axios
      .post("https://gocart-gqbi.onrender.com/send-otp-mail", {
        to: email,
        subject: "OTP for Password Reset",
      })
      .then((res) => {
        alert("OTP Sent to Email");
        setOtpSent(true);
        setServerOtp(res.data.otp);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to send OTP.");
      });
  };

  const verifyOtp = () => {
    if (otpInput === serverOtp) {
      alert("OTP Verified! Redirecting to reset password...");
      navigate("/reset-password");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div
      className="min-h-screen bg-center"
      style={{
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8IMeAXVueTflCQy_MNhIuZOyNXvB6rYnu_g&s')`,
      }}
    >
      <Header2 />
      <div className="max-w-md mx-auto mt-40 p-10 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-600">Consumer Login</h2>
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <input
            type="number"
            name="mobile_number"
            placeholder="Mobile Number"
            value={formData.mobile_number}
            onChange={(e) =>
              setFormData({ ...formData, mobile_number: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-sm text-center text-gray-700">
          Forgot Password?{" "}
          <button
            onClick={() => setShowModal(true)}
            className="text-green-700 font-medium hover:underline"
          >
            Click Here
          </button>
        </div>
        <div className="mt-4 text-sm text-center text-gray-700">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/consumer-auth")}
            className="text-green-700 font-medium hover:underline"
          >
            Sign up here
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Reset Password</h3>
            {!otpSent ? (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border rounded mb-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={sendOtp}
                  className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full p-2 border rounded mb-4"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                />
                <button
                  onClick={verifyOtp}
                  className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Verify OTP
                </button>
              </>
            )}
            <button
              className="mt-4 text-red-600 text-sm"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsumerLogin;
