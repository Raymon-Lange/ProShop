import express from 'express'
const router = express.Router()
import { registerUser, loginUser, getUser } from '../controllers/userController.js'

import {protect} from '../middleware/authMiddleware.js'


router.post('/', registerUser)
router.post('/login',loginUser )
router.get('/profile',protect,  getUser)

export default router