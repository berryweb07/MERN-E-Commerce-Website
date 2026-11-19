import { useParams } from "react-router";

export default function OrderSuccess() {
  const { id } = useParams();

  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Order Placed Successfully</h2>
        <p className="text-center">Your Order ID: {id}</p>
        <button
          onClick={goHome}
          className="w-full mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <span>Continue Shopping</span>
        </button>
      </div>
    </div>
  );
}
