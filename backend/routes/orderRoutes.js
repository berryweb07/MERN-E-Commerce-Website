import express from "express";
import placeOrder from "../controllers/orderControllers.js";

const router = express.Router();

router.post("/place", placeOrder);

export default router;