const router = require("express").Router();
const {
  generatePayment,
  verifyPayment,
} = require("../controllers/paymentController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/generate-payments", verifyToken, generatePayment);
router.post("/verify-token", verifyToken, verifyPayment);

module.exports = router;
