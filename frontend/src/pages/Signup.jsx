import { useState } from "react";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import api from "../api/axios";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Message aur Error save karne ke liye state
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await api.post("/auth/signup", form);

      setMessage(res.data.message || "User registered successfully");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Get started with your free account
          </p>
        </div>

        {/* Success Message */}
        {message && (
          <div className="mb-4 p-2.5 text-xs text-center font-medium text-green-700 bg-green-100 rounded-lg">
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-2.5 text-xs text-center font-medium text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 rounded-xl border border-gray-200 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 rounded-xl border border-gray-200 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 rounded-xl border border-gray-200 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span>Sign Up</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </form>
      </div>
    </div>
  );
}
