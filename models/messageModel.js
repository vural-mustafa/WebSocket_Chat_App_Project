import mongoose from 'mongoose'

const Schema = mongoose.Schema

const messageSchema = Schema({
    message: {type:String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
})

const MessageModel = mongoose.model('message', messageSchema)

export default MessageModel