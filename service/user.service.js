import userRepository from "../repository/user.repository.js";


const user_register = async (userObject) => await userRepository.user_register(userObject)

const user_find = async (username) => await userRepository.user_find(username)

export default {user_register,user_find}