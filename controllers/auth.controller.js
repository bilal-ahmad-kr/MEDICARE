const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { fullName, email, password, phone } = req.body || {};

    if (!fullName || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: hashPassword,
      phone,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User register successfully",
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    // validate input fields

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check if the user are required
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    // Verify the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    // Generate jwt token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "your_fallback_password",
      { expiresIn: "1d" },
    );
    // Send success response
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    // User id get from middleware
    const user = await User.findById(req.user?.id).select("-password");
    
    // If user not exist
    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Success response
    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: user,
    });
  } catch(error){
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    })
  }
}

module.exports = { registerUser, loginUser, getProfile }