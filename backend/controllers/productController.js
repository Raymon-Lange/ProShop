import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc Gets all products we are selling 
// @route Get /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
})

// @desc Gets just the details for a product
// @route Get /api/products/:id
// @access Public
const getProductById = asyncHandler(async ( req, res ) => {
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc delete just the details for a product
// @route DELETE /api/products/:id
// @access private/admin
const deleteProductById = asyncHandler(async ( req, res ) => {
    const product = await Product.findById(req.params.id)

    if(product){
        await Product.deleteOne(product)
        res.json({message: 'Product has been removed'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc Create new order
// @route POST /api/products 
// @access Public
const createProduct = asyncHandler(async (req, res) => {
    const {
      name,
      image,
      description,
      brand,
      price,
      countInStock,
      category,
    } = req.body
  
    if (name && price.length === 0) {
      res.status(400)
      throw new Error('Need to have at least name and price')
      return
    } else {
      const product = new Product({
        name,
        image,
        description,
        brand,
        price,
        countInStock,
        category,
        user : req.user._id,
      })
  
      const createdProduct = await product.save()
  
      res.status(201).json(createdProduct)
    }
  })

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
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
      throw new Error('Product not found')
    }
  })

export {
    getProductById, 
    getProducts,
    deleteProductById,
    createProduct,
    updateProduct
}
