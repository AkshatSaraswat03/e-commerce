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
  const pageSize = 5
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
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



//create a new reviews
//private
router.post('/:id/reviews', protect, asyncHandler(async (req, res) => {
  const {
    rating,
    comment
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already Reviewed !')
    }

    const review = ({
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    })

    product.reviews.push(review)
    product.numReviews = product.reviews.length

    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save()
    res.status(201).json({ message: "Review Added" })

  } else {
    res.status(404)
    throw new Error('Product not Found')
  }


}))

module.exports = router