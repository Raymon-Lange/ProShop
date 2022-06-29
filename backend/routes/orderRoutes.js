import express from 'express'
const router = express.Router()
import { createOrder, getOrderById, updateOrderToPaid } from '../controllers/orderController.js'

import {protect} from '../middleware/authMiddleware.js'

router.route('/').post(protect, createOrder)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router