import express from 'express'
const router = express.Router()
import { registerUser, loginUser, getUser, updateUser, getUsers, deleteUser, getUserId, updateUserbyId } from '../controllers/userController.js'

import {protect, admin} from '../middleware/authMiddleware.js'


router.route('/').get(protect, admin, getUsers).post(registerUser)
router.post('/login',loginUser )
router.route('/profile').get(protect, getUser).put(protect, updateUser)
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin, getUserId).put(protect,admin, updateUserbyId)

export default router