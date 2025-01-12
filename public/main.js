const protocol = window.location.protocol.includes("https") ? "wss" : "ws"
const socket = new WebSocket(`${protocol}://${location.host}`)
const messageInput = document.getElementById('messageInput')
const chatArea = document.getElementById('chatArea')
const fullName = document.getElementById('fullName')
const username = document.getElementById('username')
const userId = document.getElementById('userId')

socket.addEventListener('open', () => {
    console.log('Connected')
})

socket.addEventListener('message', (data) => {
    const dataParsed = JSON.parse(data.data)
    console.log(dataParsed)
    chatArea.innerHTML += `<li>
        <div class="messageBox">
            <div class="nameStlye"><p>${dataParsed.fullName}</p></div>
            <div class="messageStyle"><p>${dataParsed.message}</p></div>
        </div>
    </li>`

    chatArea.scrollTop = chatArea.scrollHeight
})

messageInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.code === 'Enter') {
        sendMessage()
    }
})

function sendMessage() {
    chatArea.innerHTML += `<li>
        <div class="messageBox" style="text-align: end; margin-left: auto;margin-right: 10px;background: #FFA1CF;">
            <div class="nameStlye"><p>${fullName.innerHTML}</p></div>
            <div class="messageStyle"><p>${messageInput.value}</p></div>
        </div>
    </li>`
    const userInfo = {
        id: userId.innerHTML,
        username: username.innerHTML,
        fullName: fullName.innerHTML,
        message: messageInput.value
    }
    const sendInfo = JSON.stringify(userInfo)
    socket.send(sendInfo)
    chatArea.scrollTop = chatArea.scrollHeight
    messageInput.value = ''
}

(function () {
    chatArea.scrollTop = chatArea.scrollHeight
})()

const cikisYap = () => {
    document.cookie = 'jwt=; Max-Age=0'
    location.reload()
}
