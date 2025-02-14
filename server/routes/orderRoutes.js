const {
  getOrdersByUserId,
  getAllOrders,
  getMetrics,
  updateOrderStatus,
} = require("../controllers/orderController");

const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();

router.get("/get-orders-by-user-id", verifyToken, getOrdersByUserId);
router.get("/get-all-orders", verifyToken, getAllOrders);
router.get("get-metrics", verifyToken, getMetrics);
router.get("/update-order-status/:paymentId", verifyToken, updateOrderStatus);

module.exports = router;
