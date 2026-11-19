import Address from "../models/Address.js";

// save address
export const saveAddress = async (req, res) => {
    try {
        const address = await Address.create(req.body);
        res.json({ message: "Address saved successfully", address });

    } catch (error) {
        res.status(500).json({ message: "Error saving address", error: error.message });
    }
};

// get address by userId

export const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({ userId: req.params.userId });
        res.json({ message: "Addresses retrieved successfully", addresses });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving addresses", error });
    }
};