import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //Get token from header
            token = req.headers.authorization.split(' ')[1]
            // check the tocern 
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from a the token 
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error)
        {
            console.log(error)
            res.status(401)
            throw new Error('Not Authotrized')
        }

        if(!token)
        {
            res.status(401)
            throw new Error('Not Authotrized, No Token')
        }
    }
})

const admin = (req, res, next ) => {
    if(req.user && req.user.isAdmin){
        next()
    } else { 
        res.status(401)
        throw new Error('Not Authorized')
    }
}

export { protect, admin }