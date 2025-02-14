const Razorpay = require("razorpay");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const {
  validatePaymentVerification,
} = require("razorpay/dist/utils/razorpay-utils");

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const generatePayment = async (req, res) => {
  const userId = req.id;
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: Math.random().toString(36).substring(2),
    };
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    instance.orders.create(options, async (err, orders) => {
      if (err) {
        return res.status(500).json({ message: err, success: false });
      }
      return res.status(200).json({
        success: true,
        data: {
          ...orders,
          name: user.name,
        },
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const verifyPayment = async (req, res) => {
  const userId = req.id;
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      amount,
      productArray,
      address,
    } = req.body;
    const signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
    validatePaymentVerification(
      { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
      signature,
      process.env.RAZORPAY_KEY_SECRET
    );
    if (!validatePayment) {
      return res.status(400).json({
        message: " Payment verification failed",
        success: false,
      });
    }
    for (const product of productArray) {
      await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { purchasedProducts: product.id } }
      );
      await Product.findByIdAndUpdate(
        { _id: product.id },
        { $inc: { stock: -product.quantity } }
      );
    }
    await Order.create({
      amount: amount / 100,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: signature,
      userId: userId,
      address: address,
      products: productArray,
    });
    return res.status(200).json({ message: "Payment Verified", success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message, success: false });
  }
};
module.exports = {
  generatePayment,
  verifyPayment,
};
