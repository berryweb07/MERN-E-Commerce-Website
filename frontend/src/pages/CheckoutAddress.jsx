import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function CheckoutAddress() {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const saveAddress = async (e) => {
        await api.post("/addresses/add", {...form, userId});
        navigate("/checkout");
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">Delivery Address</h1>
            {
                Object.keys(form).map((key) => (
                    <input
                        key={key}
                        type="text"
                        name={key}
                        placeholder={key}
                        value={form[key]}
                        onChange={handleChange}
                        className="w-full p-2 mt-2 border rounded-md"
                    />
                ))
            }
            <button
                onClick={saveAddress}
                className="w-full p-2 mt-4 text-white bg-blue-500 rounded-md"
            >
                Save Address
            </button>
        </div>

    )
};