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

//create a product
//private
router.post('/', protect, admin, asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description'
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)

}))

//update a product
//private
router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {

    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)

  } else {
    res.status(404)
    throw new Error('Product not Found')
  }


}))


module.exports = router