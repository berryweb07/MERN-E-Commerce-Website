import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function Checkout() {
  const userId = localStorage.getItem("userId");
  const [address, setAddress] = useState([]);
  const [selectAddress, setSelectAddress] = useState(null);
  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }
    const fetchData = async () => {
      try {
        const cartRes = await api.get(`/cart/${userId}`);
        const cartData = cartRes.data.cart || cartRes.data;
        setCart(cartData);

        const addressRes = await api.get(`/addresses/${userId}`);
        const addressData = Array.isArray(addressRes.data)
          ? addressRes.data
          : addressRes.data.address || addressRes.data.addresses || [];
        setAddress(addressData);
        setSelectAddress(addressData[0] || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  if (!cart) {
    return <div>Loading...</div>;
  }

  const itemsList = Array.isArray(cart)
    ? cart
    : cart?.items || cart?.products || cart?.cartItems || [];

  const total = itemsList.reduce((sum, i) => {
    const price = i.price || i.productId?.price || 0;
    const qty = i.quantity || 1;
    return sum + Number(price) * Number(qty);
  }, 0);

  const placeOrder = async () => {
    if (!selectAddress) {
      setError("Please select an address");
      return;
    }
    if (itemsList.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setError("");
    setPlacing(true);
    try {
      const res = await api.post("/orders/place", {
        userId,
        address: selectAddress,
      });
      navigate(`/order-success/${res.data.orderId}`);
    } catch (err) {
      console.error("Place order error:", err);
      setError(
        err.response?.data?.message || "Could not place order, please try again"
      );
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <h2 className="font-semibold mb-2">Select Address</h2>

      {address.length > 0 ? (
        address.map((addr) => (
          <label
            key={addr._id}
            className="flex items-center gap-4 border-2 border-gray-400 rounded-lg p-4 mb-4 cursor-pointer"
          >
            <input
              type="radio"
              name="address"
              checked={selectAddress?._id === addr._id}
              onChange={() => setSelectAddress(addr)}
            />
            <strong>{addr.fullName}</strong>
            <p className="text-sm">
              {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
            </p>
            <p className="text-sm">{addr.phone}</p>
          </label>
        ))
      ) : (
        <p className="text-gray-500 mb-4">
          No saved address found. Please add an address.
        </p>
      )}

      <h2 className="font-semibold mb-2">Order Summary</h2>
      <p>Total Amount: ${total}</p>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        onClick={placeOrder}
        disabled={!selectAddress || placing}
        className="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded mt-4"
      >
        {placing ? "Placing Order..." : "Place Order (COD)"}
      </button>
    </div>
  );
}