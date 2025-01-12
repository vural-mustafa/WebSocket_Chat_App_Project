import mongoose from "mongoose";

const connectDb = () => {
    mongoose.set({strictQuery:false})
    mongoose.connect(process.env.DB).then(res => {
        console.log('Database bağlantısı sağlandı!')
    }).catch(e => {
        console.log(e)
    })
}

export default connectDb