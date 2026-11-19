import express from 'express';
import { addToCart, removeFromCart, updateQuantity, getCart } from '../controllers/cartControllers.js';

const router = express.Router();

//add item to cart
router.post('/add', addToCart);

//remove item from cart
router.post('/remove', removeFromCart);

//update quantity of item in cart
router.post('/update', updateQuantity);

//get cart items for a user
router.get('/:userId', getCart);


export default router;