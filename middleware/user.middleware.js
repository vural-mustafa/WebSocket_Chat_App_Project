const userControl = (req, res, next) => {
    const token = req.cookies.jwt
    if (req.url === '/chat')
        if (typeof token === 'undefined') res.redirect('/user/login')
    else
        next()

    if(req.url === '/user/login' || req.url === '/user/register')
        if (token) res.redirect('/chat')
    else
        next()
}

export default {userControl}