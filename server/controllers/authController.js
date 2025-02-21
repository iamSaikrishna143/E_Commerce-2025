const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const signup = async (req, res) => {
  const { name, email, password, phone } = req.body;
  // console.log(req.body);

  try {
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Please try again differnet email" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, phone });
    await user.save();
    return res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }
    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      success: true,
      token: token,
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const adminSignup = async (req, res) => {
  const { username, password } = req.body;
  try {
    let admin = await Admin.findOne({ username });
    if (admin)
      return res.status(400).json({
        success: false,
        message: "Please try again differnet username",
      });

    const securePassword = await bcrypt.hash(password, 10);
    admin = new Admin({ username, password: securePassword });
    await admin.save();
    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    let admin = await Admin.findOne({ username });
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin not found" });
    }
    const comparePassword = await bcrypt.compare(password, admin.password);
    if (!comparePassword) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }
    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      success: true,
      token,
      message: "Admin logged in successfully",
      user: {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = { signup, login, adminSignup, adminLogin };
