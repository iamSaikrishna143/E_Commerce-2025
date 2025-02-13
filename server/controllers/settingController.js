const ROLES = require("../utils/constants");
const Admin = require("../models/Admin");
const User = require("../models/User");

const changeUsername = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access" });
  }
  try {
    const { previousUsername, newUsername } = req.body;
    if (!newUsername) {
      return res
        .status(400)
        .json({ success: false, message: "New username is required" });
    }
    const user = await Admin.findOneAndUpdate(
      {
        username: previousUsername,
      },
      {
        username: newUsername,
      },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: `New username is ${user.username}`,
      user: {
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const changePassword = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access" });
  }

  try {
    const { username, previousPassword, newPassword } = req.body;
    if (!previousPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Previous anf new Password is required",
      });
    }
    let user = await Admin.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      previousPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Previous Password is incorrect" });
    }
    const securePassword = await bcrypt.hash(newPassword, 10);
    user.password = securePassword;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { changePassword, changeUsername };
