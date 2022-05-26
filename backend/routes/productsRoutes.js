import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'

// @desc Gets all products we are selling 
// @route Get /api/products
// @access Public
router.get('/', asyncHandler( async (req,res ) => {
    const products = await Product.find({})

    res.json(products)
}))

// @desc Gets just the details for a product
// @route Get /api/products/:id
// @access Public
router.get('/:id', asyncHandler( async (req,res ) => {
    const product = await Product.findById(req.params.id)

    if(product){
        res.json
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

    res.json(product)
}))

export default router