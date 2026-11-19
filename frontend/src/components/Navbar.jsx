import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  // 1. userId ko State mein rakhein taake dynamic update ho
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    // LocalStorage se hamesha latest userId uthein
    const currentUserId = localStorage.getItem("userId");
    setUserId(currentUserId);

    const loadCart = async () => {
      if (!currentUserId) return setCartCount(0);
      try {
        const res = await api.get(`/cart/${currentUserId}`);

        // res.data.items ke null/undefined hone par empty array [] safely use hoga
        const items = res.data?.items || res.data || [];
        const total = Array.isArray(items)
          ? items.reduce((sum, item) => sum + item.quantity, 0)
          : 0;

        setCartCount(total);
      } catch (error) {
        console.error(error);
      }
    };

    loadCart();

    window.addEventListener("cartUpdated", loadCart);
    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, [userId]);

  const logout = () => {
    localStorage.clear();
    setUserId(null); // State clear karne se turant Login/Signup dikhega
    setCartCount(0);
    navigate("/login");
  };

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-gray-100 shadow-md">
      {/* Brand Logo / Name */}
      <Link to="/" className="text-2xl font-bold text-black">
        BerryWeb-Store
      </Link>

      {/* Right Side Controls */}
      <div className="flex items-center gap-6">
        <Link to="/cart" className="relative text-2xl text-gray-700">
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Conditional Auth Links */}
        {!userId ? (
          <div className="flex gap-4 font-semibold text-lg">
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Signup
            </Link>
          </div>
        ) : (
          <button
            onClick={logout}
            className="text-lg font-semibold text-red-600 hover:underline"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
