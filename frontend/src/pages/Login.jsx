import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";
import { ArrowRight } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token); 
      localStorage.setItem("userId", res.data.user.id); 
      setMessage(res.data.message || "User logged in successfully");

      setTimeout(() => {
        navigate("/");
      }, 1000);

      setForm({ email: "", password: "" });
    } catch (err) {
      setMessage("");
      setError(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login to Your Account
        </h2>
        {message && (
          <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 rounded-xl border border-gray-200 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 rounded-xl border border-gray-200 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
            required
          />
          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span>Login</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </form>
      </div>
    </div>
  );
}
