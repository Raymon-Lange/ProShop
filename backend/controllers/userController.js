import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

// @desc Register User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler (async (req, res,) => {
    const { name, email, password, } = req.body

    console.log(email)

    if(!name || !email || !password){
        res.status('400')
        throw new Error('Please add all fields')
    }

    // Check if we have users 
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error(`User already exits for ${email}`)
    }

    //Create User and Hashpassword 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({name, email, password: hashedPassword,})

    if(user){
        res.status(201).json({_id: user.id, name: user.name, email: user.email, token: generateToken(user._id)})
    }
    else{
        res.status(400)
        throw new Error('Failed to create user')
    }
}) 


// @desc Logs in the user
// @route POST /api/users/login
// @access Public 
const loginUser = asyncHandler( async (req, res) => {
    const {email, password, } = req.body

    if(!email || !password){
        res.status('400')
        throw new Error('Please add all fields')
    }

    //Check if we have a user by email 
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({_id: user.id, name: user.name, email: user.email, token: generateToken(user._id)})
    }
    else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
  
  // @desc    Update user profile
  // @route   PUT /api/users/profile
  // @access  Private
  const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = req.body.password
      }
  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d',})
}

export {
    registerUser,
    loginUser,
    getUser,
    updateUser,
}