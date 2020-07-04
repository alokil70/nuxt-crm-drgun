router.patch('/:id', getSetting, async (req, res) => {
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
                res.setting.status = req.body.status
                res.setting.industry = req.body.industry
                res.setting.offer = req.body.offer
                res.setting.geo = req.body.geo
                try {
                    await res.setting.save()
                    res.status(201).json(res.setting)
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
                res.setting.status = req.body.status
                res.setting.industry = req.body.industry
                res.setting.offer = req.body.offer
                res.setting.geo = req.body.geo
                try {
                    await res.setting.save()
                    res.status(201).json(res.setting)
                } catch (e) {
                    res.status(500).json({ message: e.message })
                }
            }
        })
    }
})
