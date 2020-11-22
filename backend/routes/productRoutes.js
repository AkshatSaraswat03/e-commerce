const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const Product = require('../models/productModel')
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



//gets all products
//public
router.get('/', asyncHandler(async (req, res) => {
  const products = await Product.find({})

  res.json(products)
}))


//gets the product you need
//public
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.send(product)
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
}))

//delete the product
//private
router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'product deleted' })
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
}))


module.exports = router