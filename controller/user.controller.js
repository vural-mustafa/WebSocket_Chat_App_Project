import userService from "../service/user.service.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import messageRepository from "../repository/message.repository.js";

const user_register = async (req,res) => {
const {fullName,username,password} = req.body
    try {
        await userService.user_register({fullName,username,password})
        res.redirect('/user/login')
    }catch (e) {
        console.log(e)
    }
}

const user_login = async (req,res) => {
    const {username,password} = req.body
    try {
        const user =  await userService.user_find(username)
        if(user) {
            const auth = await bcrypt.compare(password,user.password)
            if(auth) {
                // TODO: jwt işlemleri yapılacak
                const maxAge = 60*48*1000
                const token = jwt.sign({user},"websocket",{expiresIn: maxAge},)
                res.cookie('jwt',token,{maxAge:maxAge*60})
                res.redirect('/chat')
            }else {
                res.redirect('back')
                return "Şifre hatalı"
            }
        }else {
            res.redirect('back')
            return "Kullanıcı bulunamadı!"

        }
    }catch (e) {
        console.log(e)
    }
}
const chat_page = async (req,res) => {

    const allMessage = await messageRepository.get_message_all()

    const token = req.cookies.jwt
    const userObject = jwt.verify(token,"websocket")
    console.log(allMessage)
    res.render('index', {userObject: userObject.user, messages:allMessage})

}

export default {user_register,user_login, chat_page}