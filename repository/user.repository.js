import userModel from "../models/userModel.js";

const user_register = async (userObject) => {
    return await userModel.create(userObject)
}
const user_find = async (username) => await userModel.findOne({username})

const user_findById = async (id) => await userModel.findById(id)


export default {user_register, user_find,user_findById}