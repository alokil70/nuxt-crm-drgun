const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const multer = require('multer')
const Manager = require('../model/manager')
const imageMimeTypes = ['image/jpeg', 'image/png']

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'static/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        cb(null, imageMimeTypes.includes(file.mimetype))
    }
})

router.get('/', (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: 'Токен не распознан' })
    } else {
        const token = req.headers.authorization.split('Bearer ')[1]
        jwt.verify(token, process.env.TOKEN, async function(err, decoded) {
            if (err) {
                req.status(403).json({ message: 'Неправильный токен' })
            }
            if (decoded.admin === false) {
                res.status(403).json({ message: 'Нужны права администратора' })
            } else {
                try {
                    const managers = await Manager.find()
                        .select()
                        .sort('-date_created')
                        .lean()
                        .exec()
                    res.json(managers)
                } catch (e) {
                    res.status(500).json({ message: e.message })
                }
            }
        })
    }
})

router.get('/:id', getManager, (req, res) => {
    res.json(res.manager)
})

router.delete('/:id', getManager, (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: 'Токен не распознан' })
    } else {
        const token = req.headers.authorization.split('Bearer ')[1]
        jwt.verify(token, process.env.TOKEN, async function(err, decoded) {
            if (err) {
                req.status(403).json({ message: 'Неправильный токен' })
            }
            if (decoded.admin === false) {
                res.status(403).json({ message: 'Нужны права администратора' })
            } else {
                try {
                    await res.manager.remove()
                    res.status(200).json({ message: 'Удалено' })
                } catch (e) {
                    res.status(500).json({ message: e.message })
                }
            }
        })
    }
})

router.post('/', (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: 'Токен не распознан' })
    } else {
        const token = req.headers.authorization.split('Bearer ')[1]
        jwt.verify(token, process.env.TOKEN, async function(err, decoded) {
            if (err) {
                res.status(403).json({ message: 'Неправильный токен' })
            }
            if (decoded.admin === false) {
                res.status(403).json({ message: 'Нужны права администратора' })
            } else {
                const hashedPassword = await bcrypt.hash(req.body.password, 10)
                const manager = new Manager({
                    login: req.body.login,
                    name: req.body.name,
                    note: req.body.note,
                    password: hashedPassword,
                    admin: req.body.admin
                })
                try {
                    await manager.save()
                    res.status(201).json({ message: 'Создано' })
                } catch (e) {
                    res.status(500).json({ message: e.message })
                }
            }
        })
    }
})

router.patch('/:id', getManager, (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: 'Токен не распознан' })
    } else {
        const token = req.headers.authorization.split('Bearer ')[1]
        jwt.verify(token, process.env.TOKEN, async function(err, decode) {
            if (err) {
                res.status(500).json({ message: 'Неправильный токен' })
            } else {
                res.manager.login = req.manager.login
                res.manager.name = req.manager.name
                res.manager.note = req.manager.note
                try {
                    await res.manager.save()
                    res.status(201).json({
                        login: res.manager.login,
                        name: res.manager.name,
                        note: res.manager.note
                    })
                } catch (e) {
                    res.status(500).json({ message: e.message })
                }
            }
        })
    }
})

router.patch('/password/:id', getManager, (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: 'Токен не распознан' })
    } else {
        const token = req.headers.authorization.split('Bearer ')[1]
        jwt.verify(token, process.env.TOKEN, async function(err, decoded) {
            if (err) {
                res.status(403).json({ message: 'Неправильный токен' })
            }
            if (decoded.admin === false) {
                res.status(403).json({ message: 'Нужны права администратора' })
            } else {
                const hashedPassword = await bcrypt.hash(req.body.password, 10)
                res.manager.password = hashedPassword
                try {
                    await res.manager.save()
                    res.status(201).json(res.manager)
                } catch (e) {
                    res.status(500).json({ message: e.message })
                }
            }
        })
    }
})

router.patch('/admin/:id', getManager, (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: 'Токен не распознан' })
    } else {
        const token = req.headers.authorization.split('Bearer ')[1]
        jwt.verify(token, process.env.TOKEN, async function(err, decoded) {
            if (err) {
                res.status(403).json({ message: 'Неправильный токен' })
            }
            if (decoded.admin === false) {
                res.status(403).json({ message: 'Нужны права администратора' })
            } else {
                res.manager.admin = req.manager.admin
                try {
                    await res.manager.save()
                    res.status(201).json(res.manager)
                } catch (e) {
                    res.status(500).json({ message: e.message })
                }
            }
        })
    }
})

router.post('addFile', upload.single('file'), (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: 'Токен не распознан' })
    } else {
        const token = req.headers.authorization.split('Bearer ')[1]
        jwt.verify(token, process.env.TOKEN, async function(err, decoded) {
            if (err) {
                res.status(403).json({ message: 'Неправильный токен' })
            } else {
                const newFilename = req.file != null ? req.file : null
                try {
                    await res.json(newFilename)
                } catch (e) {
                    res.status(500).json({ message: e.message })
                }
            }
        })
    }
})

async function getManager(req, res, next) {
    let manager = null
    try {
        manager = await Manager.findOne({ _id: req.params.id })
        if (manager) {
            return res.status(404).json({ message: 'Нет такой страницы' })
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
    res.manager = manager
    next()
}

module.exports = router
