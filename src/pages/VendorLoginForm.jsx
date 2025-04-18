// src/pages/VendorLoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header2 from "../components/Header2";

const VendorLoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mobile_number: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://gocart-gqbi.onrender.com/vendors/login", formData)
      .then((res) => {
        const vendor = res.data.data;
        localStorage.setItem("vendor_id", JSON.stringify(vendor._id));
        localStorage.setItem("vendor_mobile", vendor.mobile_number);
        alert("Login Successful!");
        navigate("/vendordashboard");
      })
      .catch((err) => {
        console.error(err);
        alert("Login failed. Please try again.");
      });
  };

  return (
    <div
      className="bg-gradient-to-r from-green-100 to-blue-50 min-h-screen"
      style={{
        backgroundImage:
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc2I0veDVr9YEMkCkx5GQv4WX_rRHn5YQiaw&s')",
        backgroundSize: "",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Ensures the image doesn't scroll
      }}
    >
      <Header2 />
      <div className="max-w-md mx-auto mt-40 p-10 bg-amber-50  rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
          Vendor Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="number"
            name="mobile_number"
            placeholder="Mobile Number"
            value={formData.mobile_number}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
          >
            Submit
          </button>
        </form>
        <div className="mt-4 text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate('/vendorlogin')}
            className="text-green-900 font-semibold hover:underline"
          >
            Sign up here
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorLoginForm;
