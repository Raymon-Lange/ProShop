import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productsRoutes.js'
import userRoutes from  './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

//Set up and init data and connection
dotenv.config()
connectDB()
const app = express()
app.use(express.json())

//Defining the end points 
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)


//Setting up middleware helpers 
app.use(errorHandler)
app.use(notFound)

//Off and running! 
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server Running on port ${PORT} in ${process.env.NODE_ENV} mode`))
