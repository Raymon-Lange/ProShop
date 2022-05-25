import mongoose from 'mongoose'

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        //const conn = await mongoose.connect("mongodb+srv://mearngoals:JsbOJXaXwn59Rjxu@goals.ofvd2.mongodb.net/mernapp?retryWrites=true&w=majority")

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan)
    } catch ( error) {
        console.log(error)
        process.exit(1)
    }
}


export default connectDB