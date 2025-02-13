const Pincode = require("../models/Pincode");
const ROLES = require("../utils/constants");

const addPincodes = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
      success: false,
    });
  }
  const { pincodes } = req.body;

  if (!pincodes || pincodes.length === 0) {
    return res
      .status(400)
      .json({ message: "Pincode is required", success: false });
  }
  try {
    const existingPincodes = await Pincode.find({
      pincode: {
        $in: pincodes.map((p) => p.pincode),
      },
    });
    const existingPincodeValues = existingPincodes.map((p) => p.pincode);
    const newPincodes = pincodes.filter(
      (p) => !existingPincodeValues.includes(p.pincode)
    );
    if (newPincodes.length == 0) {
      return res
        .status(400)
        .json({ message: "All pincodes already exist", success: false });
    }
    await Pincode.insertMany(newPincodes);
    return res
      .json(200)
      .json({ message: "Pincodes add successfully", success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

const getPincode = async (req, res) => {
  const { pincode } = req.params;
  try {
    const existingPincode = await Pincode.find({ pincode });
    
    if (existingPincode.length === 0) {  // ✅ Corrected check
      return res.status(404).json({ message: "Pincode not found for delivery", success: false });
    }
    
    return res.status(200).json({ message: "Pincode is available for delivery", success: true });  // ✅ Corrected response
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};


module.exports = { addPincodes, getPincode };
