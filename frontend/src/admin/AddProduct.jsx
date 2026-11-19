import React, { useState } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router";

export default function AddProducts() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/products/add", form);
            alert("Product added successfully!");
            navigate("/admin/products");
        } catch (error) {
            console.log("error adding product:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow-md">
            <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
            <form onSubmit={handleSubmit}>
                {Object.keys(form).map((key) => (
                    <input  
                        key={key}
                        type="text"
                        name={key}
                        value={form[key]}
                        onChange={handleChange}
                        placeholder={key}
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                ))
                }
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer">   
                    Add Product
                </button>
                </form>
        </div>
    );
}

