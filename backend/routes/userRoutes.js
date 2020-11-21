const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')
const protect = require('../middlewares/authMiddleware')




//admin middleware 
const admin = (req, res, next) => {

  if (req.user && req.user.isAdmin) {

    next()
  } else {
    res.status(401)
    throw new Error('Not an admin')
  }
}




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


// to get a logged in user.
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


}))




// to update a user profile.
// PUT request
// private
router.put('/profile', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  //console.log(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.user.password) {
      user.password = req.user.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    })
  } else {
    res.status(404)
    throw new Error('User not found !')
  }


}))




// to register a new user
//public
router.post('/', asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User exists')
  }

  const user = await User.create({
    name,
    email,
    password
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('User not found!!')
  }

}))

//get all users
//private
router.get('/', protect, admin, asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
}))


//delete a user
//private
router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await user.remove()
    res.json({ message: 'user Removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
}))



module.exports = router