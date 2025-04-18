import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header2 from "../components/Header2";

const ConsumerAuthPage = () => {
  const [authData, setAuthData] = useState({
    name: "",
    mobile_number: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://gocart-gqbi.onrender.com/consumers",
        authData
      );
      console.log("User registered:", response.data.data);
      localStorage.setItem("consumer_id", JSON.stringify(response.data.data._id));
      localStorage.setItem("token", response.data.data.token);
      alert("Registered successfully!");
      navigate("/venders");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfLfqfjbdqqAIBIEp5eucvTb3G76S4THeBMw&s')",
      }}
    >
      <Header2 />

      <div className="flex items-center justify-center px-4 py-16">
        <div className=" bg-opacity-90 backdrop-blur-sm p-8 rounded-xl shadow-xl w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
            Consumer Signup
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={authData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={authData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-md"
              required
            />
            <input
              type="text"
              name="mobile_number"
              placeholder="Mobile Number"
              value={authData.mobile_number}
              onChange={handleChange}
              className="w-full border p-3 rounded-md"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={authData.password}
              onChange={handleChange}
              className="w-full border p-3 rounded-md"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold"
            >
              Continue
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-700">
            Already have an account?{" "}
            <span
              className="text-green-700 font-medium cursor-pointer hover:underline"
              onClick={() => navigate("/consumer-login")}
            >
              Login here
            </span>
          </p>
        </div>
      </div>

      <footer className="mt-10 bg-gray-900 text-gray-300 p-4 text-center text-xs">
        <p>© 2025 GoCart. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ConsumerAuthPage;
