import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";
import AddProducts from "./admin/AddProduct";
import ProductList from "./admin/ProductList";
import EditProduct from "./admin/EditProduct";
import Layout from "./components/Layout";
import Cart from "./pages/Cart";
import CheckoutAddress from "./pages/CheckoutAddress";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/admin/products",
        element: <ProductList />,
      },
      {
        path: "/admin/products/add",
        element: <AddProducts />,
      },
      {
        path: "/admin/products/edit/:id",
        element: <EditProduct />,
      },
      {
        path: "/checkout-address",
        element: <CheckoutAddress />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/order-success/:id",
        element: <OrderSuccess />,
      },
      
    ],
  },
  // Login aur Signup par Navbar bilkul nazar nahi aayega
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
