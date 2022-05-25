import mongoose from 'mongoose'

const userSchema =  mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add a email']
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    isAdmin: {
        type: Boolean,
        required: [false, 'Please add a password'],
        default: false
    },
},
{
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User