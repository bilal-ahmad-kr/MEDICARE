const adminDashboard = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Welcome to Admin Dashboard",
      user: req.user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  adminDashboard,
};