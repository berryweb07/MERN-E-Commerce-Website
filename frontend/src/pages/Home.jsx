import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProducts = async () => {
    const response = await api.get(`/products?search=${search}&category=${category}`,);
    setProducts(response.data.products);
  };
  useEffect(() => {
    loadProducts();
  }, [search, category]);

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login to add to cart");
      return;
    }

    try {
      const response = await api.post(`/cart/add`, { userId, productId });
      alert("Item added to cart!");

      const totalItems = response.data.cart?.items?.reduce(
        (sum, item) => sum + item.quantity,
        0
      ) || 0;

      localStorage.setItem("cartCount", totalItems);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Add to cart error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to add item to cart");
    }
  };

  return (
    <div className="p-6">
      {/* Search bar */}
      <div className="mb-4 gap-4 flex items-center">
        <input
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-1/2"
        />
        {/* Category filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="phone">phone</option>
          <option value="laptop">Laptop</option>
          <option value="ear buds">ear-buds</option>
        </select>
      </div>
      {/* Products grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-3 rounded shadow hover:shadow-lg transition"
          >
            <Link to={`/products/${product._id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain bg-white rounded"
              />
              <h2 className="mt-3 text-lg font-semibold">{product.title}</h2>
              <p className="mt-3 text-sm">${product.price}</p>
            </Link>

            <button
              onClick={() => addToCart(product._id)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
