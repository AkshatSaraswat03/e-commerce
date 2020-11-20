const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const Order = require('../models/orderModel')
const protect = require('../middlewares/authMiddleware')


// to create new order
//private
router.post('/', protect, asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shipiingPrice, totalPrice } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shipiingPrice,
      totalPrice
    })

    const createdOrder = await order.save()

    res.status(200).json(createdOrder)
  }
}))



// to get ordes by idr
// private
router.get('/:id', protect, asyncHandler(async (req, res) => {
  const order = await (await Order.findById(req.params.id)).populate('user', 'name email')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }

}))


module.exports = router