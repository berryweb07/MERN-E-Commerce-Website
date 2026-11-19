import Cart from "../models/cart.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity: 1 }] });
    } else {
      const item = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }

    await cart.save();

    // Population added so frontend receives populated product details immediately
    await cart.populate("items.productId");

    res.json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();
    await cart.populate("items.productId");

    res.json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error: error.message });
  }
};

// Update quantity of item in cart
export const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (item) {
      item.quantity = quantity;
      await cart.save();
      await cart.populate("items.productId");
      res.json({ message: "Item updated in cart", cart });
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating item in cart", error: error.message });
  }
};

// Get cart items for a user
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    // Handle null/missing cart gracefully
    let cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.json({ message: "Cart is empty", cart: { items: [] } });
    }

    res.json({ message: "Cart retrieved successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cart", error: error.message });
  }
};