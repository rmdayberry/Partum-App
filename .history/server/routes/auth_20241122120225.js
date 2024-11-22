const express = require('express');
const bcrypt =require('bcrypt');
const jwt= require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

//Register User
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({min:6}),
  ],
  async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array() });
    }

    const {name, email, password, dueDate, languagePreference } = req.body;

    try{
      let user= await User.findOne({email});
      if (user){
        return res.status(400).json({ msg: 'User already exists'});
      }
      user = new User({name, email, password, dueDate, languagePreference});

      //Hash Password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password,salt);

      await user.save();

      //Return a JWT
      const payload = {user: {id: user.id} };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h'});

      res.json({token});
    } catch(err){
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//Login User
router.post(
  '/login',
  [
    check('email', ' Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({erros: errors.array()});
    }

    const { email, password} = req.body;

    try{
      const user = await User.findOne({email});
      if(!user){
        return res.status(400).json({msg: 'Invalid credentials'});
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch){
        return res.status(400).json({msg: "Invalid credentials"});
      }
    }
  }
)