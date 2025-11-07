const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, city, country } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({ msg: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ msg: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ 
      name, 
      email, 
      password: hashedPassword,
      phone: phone || '',
      city: city || '',
      country: country || ''
    });
    await newUser.save();

    res.send({ msg: 'User created successfully' });
  } catch (error) {
    res.status(500).send({ msg: 'Server error', err: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ 
      id: user._id,
      email: user.email,
      name: user.name
    }, process.env.JWT_SECRET || 'secret123', { expiresIn: '24h' });
    
    res.send({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        phone: user.phone,
        city: user.city,
        country: user.country
      } 
    });
  } catch (error) {
    res.status(500).send({ msg: 'Server error' });
  }
});

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ msg: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ msg: 'Invalid token' });
  }
}

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('Profile request - User ID from token:', userId);
    
    if (!userId) {
      return res.status(401).send({ msg: 'Invalid token data' });
    }
    
    const user = await User.findById(userId).select('-password');
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      return res.status(404).send({ msg: 'User not found. Please try logging in again.' });
    }
    
    // Ensure all fields exist with defaults
    const userData = {
      _id: user._id,
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      city: user.city || '',
      country: user.country || '',
      createdAt: user.createdAt || new Date()
    };
    
    console.log('Sending user data:', userData);
    res.send({ user: userData });
  } catch (error) {
    console.error('Profile error:', error);
    if (error.name === 'CastError') {
      return res.status(400).send({ msg: 'Invalid user ID format' });
    }
    res.status(500).send({ msg: 'Server error', error: error.message });
  }
});

module.exports = router;
