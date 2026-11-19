import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function Cart() {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState({ items: [] });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      const res = await api.get(`/cart/${userId}`);
      // Backend se cart object nikalna
      if (res.data && res.data.cart) {
        setCart(res.data.cart);
      } else {
        setCart({ items: [] });
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (productId) => {
    try {
      await api.post("/cart/remove", { userId, productId });
      loadCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const updateQty = async (productId, quantity) => {
    if (quantity <= 0) {
      await removeItem(productId);
      return;
    }

    try {
      await api.post("/cart/update", { userId, productId, quantity });
      loadCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  // Safe calculation for total price
  const total = cart.items
    ? cart.items.reduce((sum, item) => {
        const price = item.productId?.price || 0;
        return sum + item.quantity * price;
      }, 0)
    : 0;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold text-center mb-6">Your Cart</h1>

      {!cart.items || cart.items.length === 0 ? (
        <div className="text-center mt-4 text-gray-500">
          Your cart is empty.
        </div>
      ) : (
        <div className="space-y-4">
          {cart.items.map((item) => {
            const product = item.productId;
            if (!product) return null;

            return (
              <div
                key={product._id || item._id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">{product.title}</p>
                    <p className="text-sm text-gray-500">
                      ${Number(product.price || 0).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQty(product._id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
                  >
                    -
                  </button>

                  <p className="text-sm font-medium">{item.quantity}</p>

                  <button
                    onClick={() => updateQty(product._id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
                  >
                    +
                  </button>

                  <div>
                    <p className="text-sm font-medium">
                      ${(item.quantity * (product.price || 0)).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeItem(product._id)}
                    className="text-sm text-red-500 hover:text-red-700 ml-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}

          <div className="flex justify-between items-center pt-4 border-t">
            <h2 className="text-base font-bold">Total: ${total.toFixed(2)}</h2>
          </div>
          <button onClick={()=> navigate("/checkout-address")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}