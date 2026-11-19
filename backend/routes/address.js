import express from "express";
import { saveAddress, getAddresses } from "../controllers/addressControllers.js";

const router = express.Router();

router.post("/add", saveAddress);
router.get("/:userId", getAddresses);   

export default router;