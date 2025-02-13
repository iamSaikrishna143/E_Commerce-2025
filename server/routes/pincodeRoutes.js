const { addPincodes, getPincode } = require("../controllers/pincodeController");
const verifyToken = require("../middlewares/verifyToken");
const router = require("express").Router();

router.post("/add-pincodes", verifyToken, addPincodes);
router.get("/get-pincodes/:pincode", getPincode);

module.exports = router;
