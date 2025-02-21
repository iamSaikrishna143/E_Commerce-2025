const Product = require("../models/Product");
const cloudinary = require("../utils/cloudinary");
const ROLES = require("../utils/constants");

const createProduct = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
      success: false,
    });
  }
  try {
    const { name, price, description, stock, colors, category } = req.body;
    const uploadedImages = [];
    for (const file in req.files) {
      const result = await cloudinary.uploader.upload(req.files[file].path, {
        folder: "products",
      });
      uploadedImages.push({
        id: result.public_id,
        url: result.secure_url,
      });
    }
    const product = new Product({
      name,
      price,
      description,
      stock,
      colors,
      category,
      images: uploadedImages,
    });
    await product.save();
    return res.status(201).json({
      message: "Product created successfully",
      success: true,
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
const updateProduct = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
      success: false,
    });
  }
  try {
    const { ...data } = req.body;
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Product updated successfully",
      success: true,
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
const deleteProduct = (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
      success: false,
    });
  }
  try {
    const { id } = req.params;
    const product = Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Product deleted successfully",
      success: true,
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    let { page, limit, category, price, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 9;
    let query = {};
    if (category) {
      query.category = category.charAt(0).toUpperCase() + category.slice(1);
    }
    if (category == "all") {
      delete query.category;
    }
    if (search) query.name = { $regex: search, $options: "i" };
    if (price > 0) query.price = { $lte: price };
    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);
    const products = await Product.find(query)
      .select("name price images rating description blacklisted")
      .skip((page - 1) * limit)
      .limit(limit);
    let newProductsArray = [];
    products.forEach((product) => {
      const productObj = product.toObject();
      productObj.image = productObj.images[0];
      delete productObj.images;
      newProductsArray.push(productObj);
    });
    if (!products.length) {
      return res.status(404).json({
        message: "No products found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      data: newProductsArray,
      pagination: {
        pageSize: limit,
        currentPage: page,
        totalPages,
        totalProducts,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
const getProductByName = async (req, res) => {
  const { name } = req.params;
  try {
    const product = await Product.findOne({ name });
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Product fetched successfully",
      success: true,
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
const blacklistedProduct = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
      success: false,
    });
  }
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { blacklisted: true },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: `The Product ${product.name} has been blacklisted`,
      success: true,
      data: product,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
      success: false,
    });
  }
};

const removeFromBlacklist = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
      success: false,
    });
  }
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { blacklisted: false },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: `The Product ${product.name} has been removed from blacklisted`,
      success: true,
      data: product,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
      success: false,
    });
  }
};
module.exports = {
  createProduct,
  updateProduct,
  getProductByName,
  deleteProduct,
  getProducts,
  blacklistedProduct,
  removeFromBlacklist,
};
