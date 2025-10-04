const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!email) return res.status(400).json({ error: { code: "FIELD_REQUIRED", field: "email", message: "Email is required" } });
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, email, passwordHash, role });
    res.json({ id: user._id });
  } catch (e) {
    return res.status(400).json({ error: { code: "USER_EXISTS" } });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: { code: "INVALID_CREDENTIALS" } });
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return res.status(400).json({ error: { code: "INVALID_CREDENTIALS" } });
  
  const token = jwt.sign({
    id: user._id,
    role: user.role,
    username: user.username
  }, process.env.JWT_SECRET);
  
  res.json({ token });
});

module.exports = router;
