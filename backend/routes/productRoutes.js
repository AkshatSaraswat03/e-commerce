const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const Product = require('../models/productModel')

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

module.exports = router