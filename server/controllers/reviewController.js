const ROLES = require("../utils/constants");
const Review = require("../models/Review");
const Product = require("../models/Product");

const createReview = async (req, res) => {
  if (req.role !== ROLES.user) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access" });
  }
  const userId = req.id;
  try {
    const { productId, review, rating } = req.body;
    const newReview = await Review.create({
      userId,
      productId,
      review,
      rating,
    });
    newReview.populate("userId", "name");
    let product = await Product.findByIdAndUpdate(productId, {
      $push: { reviews: newReview._id },
    });
    await product.calculateRating();
    return res
      .status(201)
      .json({ success: true, message: "Review created", data: newReview });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const updateReview = async (req, res) => {
  if (req.role !== ROLES.user) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access" });
  }
  try {
    const { id } = req.params;
    const { updatedReview } = req.body;
    let review = await Review.findByIdAndUpdate(
      id,
      { review: updatedReview },
      { new: true }
    );
    await review.populate("userId", "name");
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Review updated", data: review });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const replyReview = async (req, res) => {
  if (req.role !== ROLES.user) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access" });
  }
  const userId = req.id;
  const { id } = req.params;
  try {
    const { review } = req.body;
    let foundReview = await Review.findOneAndUpdate(
      { _id: id },
      { $push: { replies: { userId, review } } },
      { new: true }
    )
      .populate("replies.userId", "name")
      .populate("userId", "name");
    if (!foundReview) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Reply added to review",
      data: foundReview,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const deleteReview = async (req, res) => {
  if (req.role !== ROLES.user) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access" });
  }

  try {
    const { id } = req.params;
    let review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }
    let product = await Product.findByIdAndDelete(review.productId, {
      $pull: { reviews: review._id },
    });
    await product.calculateRating();
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Review deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId: id })
      .populate({
        path: "userId",
        select: "name",
      })
      .populate({
        path: "replies.userId",
        select: "name",
      });
    if (!reviews) {
      return res
        .status(404)
        .json({ success: false, message: "No reviews found for this product" });
    }
    return res
      .status(200)
      .json({ success: true, data: reviews, message: "Review found" });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

module.exports = {
  createReview,
  updateReview,
  replyReview,
  deleteReview,
  getReviews,
};
