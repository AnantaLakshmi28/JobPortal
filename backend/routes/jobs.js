const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Job = require('../models/Job');

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

router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, desc, lastDate, company } = req.body;
    if (!title || !desc || !lastDate || !company) {
      return res.status(400).send({ msg: 'Missing required fields' });
    }
    
    // Validate date
    const dateObj = new Date(lastDate);
    if (isNaN(dateObj.getTime())) {
      return res.status(400).send({ msg: 'Invalid date format' });
    }
    
    const newJob = new Job({ 
      title, 
      desc, 
      lastDate: dateObj, 
      company, 
      user: req.user.id 
    });
    await newJob.save();
    res.send({ msg: 'Job saved successfully', job: newJob });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).send({ msg: 'Server error', error: error.message });
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    console.log('Fetching jobs for user:', req.user.id);
    const jobs = await Job.find({}).sort({ createdAt: -1 });
    console.log('Found jobs:', jobs.length);
    res.send({ jobs: jobs || [] });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).send({ msg: 'Server error', error: error.message });
  }
});

module.exports = router;
