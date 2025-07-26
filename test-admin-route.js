// Add this temporary route to your user.router.js for testing
router.post('/make-admin', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOneAndUpdate(
      { email: email },
      { $set: { role: "admin" } },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({ message: "User role updated to admin", user: { email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Don't forget to remove this route after testing!