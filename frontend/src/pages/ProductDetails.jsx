import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const loadProduct = async () => {
    const response = await api.get("/products/");
    const product = response.data.products.find((p) => p._id === id);
    setProduct(product);
  }

  useEffect(() => {
    loadProduct();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <img src={product.image}
         alt={product.title}
          className="w-full h-40 object-contain bg-white rounded"
           />
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-lg font-semibold">${product.price}</p>

        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"> 
          Add to Cart 
          </button>

      </div>
    )
  }
};