import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    rating: {
        type: Number,
        required: [true, 'Please add a rating'],
        default: 0
    },
    comment: {
        type: String,
        required: [true, 'Please add a comment']
    }
},{
        timestamps: true
    })

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    image: {
        type: String,
        required: [true, 'Please add a email']
    },
    brand: {
        type: String,
        required: [true, 'Please add a Brand']
    },
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: [true, 'Please add a rating'],
        default: 0
    },
    numReviews: {
        type: Number,
        required: [true, 'Please add a numReviews'],
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        default: 0
    },
    count: {
        type: Number,
        required: [true, 'Please add a price'],
        default: 0
    },
    stock: {
        type: Number,
        required: [true, 'Please add a price'],
        default: 0
    },
},
    {
        timestamps: true
    })

    const Product = mongoose.model('Product', productSchema)

    export default Product