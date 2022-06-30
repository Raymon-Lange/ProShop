import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc Create new order
// @route POST /api/products
// @access Public
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})

// @desc Gets the order details 
// @route Get /api/products/:id
// @access Public
const getOrderById = asyncHandler(async (req, res) => {
  //Making sure we get the name and email and add the user name who is logged in and email 
  // because the order model doesn't contain that information
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Updates the order to paid status 
// @route Get /api/products/:id
// @access Public
const updateOrderToPaid = asyncHandler(async (req, res) => {
  
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

    // Save the order in the DB
    const updateOrder = await order.save()


    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Gets the order details for a user who is logged in 
// @route Get /api/orders/myorders
// @access Public
const getOrderByUserId = asyncHandler(async (req, res) => {
  // gets the orders for the user who is logged in 
  const order = await Order.find({user: req.user._id})

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})


export {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getOrderByUserId,
}
