const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

// to authenticate a user. validate email/password and get a token
//public
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && await bcrypt.compare(password, user.password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
}))

module.exports = router