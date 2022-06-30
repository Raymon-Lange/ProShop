import express from 'express'
const router = express.Router()
import { registerUser, loginUser, getUser, updateUser, getUsers } from '../controllers/userController.js'

import {protect, admin} from '../middleware/authMiddleware.js'


router.route('/').get(protect, admin, getUsers).post(registerUser)
router.post('/login',loginUser )
router.route('/profile').get(protect, getUser).put(protect, updateUser)

export default router