import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Cart from "../models/cart.js";

// Place a new order for a user
const placeOrder = async (req, res) => {
  try {
    const { userId, address } = req.body;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    const orderItems = cart.items.map((item) => {
      return {
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      };
    });

    const totalAmount = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    for (let item of cart.items) {
      await Product.findByIdAndUpdate(item.productId._id, {
        $inc: { stock: -item.quantity },
      });
    }

    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount,
      address,
      paymentMethod: "COD",
    });

    // cart clear karne ke liye - poora document delete karna hai
    await Cart.findOneAndDelete({ userId });

    res.status(201).json({ message: "Order placed successfully", orderId: order._id });
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default placeOrder;