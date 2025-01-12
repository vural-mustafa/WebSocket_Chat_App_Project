import messageModel from "../models/messageModel.js";
import userRepository from "./user.repository.js";

const save_message = async (data) => {
     const user = await userRepository.user_findById(data.id)
    await messageModel.create({message:data.message, user})
}

const get_message_all = async () => await messageModel.find().populate('user')

export default {save_message,get_message_all}