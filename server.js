import http from 'http'
import express from 'express'
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userController from "./controller/user.controller.js";
import messageRepository from "./repository/message.repository.js";
import connectDb from "./db.js";
import WebSocket,{WebSocketServer} from "ws";
const app = express()
import userMiddleware from "./middleware/user.middleware.js";



dotenv.config()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser())

const server = http.createServer(app)

const wss = new WebSocketServer({server})

wss.on('connection', (ws) => {
    ws.on('message', async (data) => {
        const dataParsed = JSON.parse(data)
        console.log(dataParsed)
        await messageRepository.save_message(dataParsed)
        wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN && ws !== client)
            {
                client.send(data.toString())
            }
        })
    })
    console.log('Kullanici geldi')
})

app.get('/', (req,res) => {
    res.redirect('/chat')
})

app.get('/chat', userMiddleware.userControl,userController.chat_page)

app.get('/user/register',userMiddleware.userControl,(req,res) => {
    res.render('register')
})

app.post('/user/register',userController.user_register)

app.get('/user/login',userMiddleware.userControl,(req,res) => {
    res.render('login')
})

app.post('/user/login',userController.user_login)



server.listen(3000, () => {
    connectDb()
    console.log('Sunucu başlatıldı!')
})