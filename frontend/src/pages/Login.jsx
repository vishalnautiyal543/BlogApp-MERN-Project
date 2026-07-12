import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../features/auth/authThunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await dispatch(loginUser(formData)).unwrap();
    
    navigate("/dashboard");
    toast.success(res?.message || "Login Successful!", { position: "top-right" });

  } catch (err) {
    loading = false;
    const errorMessage = err?.message || err || "Login failed!";
    toast.error(errorMessage, { position: "top-right" });
  }
};

  return (
    <div className="min-h-screen w-full flex items-center justify-center font-inter bg-linear-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-xl p-8 sm:p-10 transition-all duration-300 hover:shadow-2xl font-Inter">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
            Welcome back
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Login to access your Techify account
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-1 text-left">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 bg-gray-50 transition-all duration-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none text-sm"
              placeholder="name@example.com"
              onChange={handleChange}
              name="email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1 text-left">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Password
              </label>
            </div>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 bg-gray-50 transition-all duration-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none text-sm"
              placeholder="••••••••"
              onChange={handleChange}
              name="password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-sm mt-2 focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:outline-none"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="relative px-3 text-xs text-gray-400 uppercase bg-white tracking-wider">
              New to Techify?
            </span>
          </div>

          {/* Registration Link */}
          <div className="text-center">
            <Link
              to="/register"
              className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200 decoration-2 hover:underline"
            >
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
