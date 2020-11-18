const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')
const protect = require('../middlewares/authMiddleware')


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
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
}))


// to get a logged in user. get a token
//private
router.get('/profile', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  console.log(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User not found !')
  }

  //res.send('success')

}))



module.exports = router