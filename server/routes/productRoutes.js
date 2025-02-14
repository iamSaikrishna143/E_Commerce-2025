const router = require("express").Router();

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductByName,
  removeFromBlacklist,
  blacklistedProduct,
} = require("../controllers/productController");
const verifyToken = require("../middlewares/verifyToken");
const upload = require("../middlewares/multer");

router.post(
  "/create-product",
  verifyToken,
  upload.array("images", 4),
  createProduct
);
router.put("/update-product/:id", verifyToken, updateProduct);
router.delete("/delete-product", verifyToken, deleteProduct);
router.get("/get-product", getProducts);
router.get("/get-product-by-name/:name", getProductByName);
router.put("/blackList-product/:idt", verifyToken, blacklistedProduct);
router.put("/remove-from-blacklist/:id", verifyToken, removeFromBlacklist);
module.exports = router;
