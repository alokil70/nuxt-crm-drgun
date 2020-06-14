const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Manager = require('../model/manager')

const app = express()
app.use(cookieParser())

app.use(
    expressJwt({
        secret: process.env.TOKEN
    }).unless({
        path: '/api/auth/login'
    })
)

router.post('/login', async (req, res, next) => {
    const login = req.body.user
    const password = req.body.password

    const loggerManager = await Manager.findOne(
        { login },
        'Name password admin _id',
        function(err, manager) {}
    )

    try {
        const valid = await bcrypt.compare(password, loggerManager.password)
        if (!valid) {
            await res.status(403).json({ message: 'Ошибка автризации...' })
        } else {
            const accessToken = jwt.sign(
                {
                    name: loggerManager.name,
                    admin: loggerManager.admin,
                    id: loggerManager._id
                },
                process.env.TOKEN,
                { expiresIn: 'id' }
            )
            await res.json({
                token: { accessToken }
            })
        }
    } catch (e) {
        next(e)
    }
})

router.get('/user', async (req, res) => {
    const tokenDecode = await jwt.decode(
        req.headers.authorization.split('Bearer ')[1]
    )
    res.json({
        name: tokenDecode.name,
        admin: tokenDecode.admin,
        id: tokenDecode.id
    })
})

router.post('/logout', async (req, res) => {
    await res.json('Вы вышли из системы...')
})

module.exports = router
