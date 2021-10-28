const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

require('../db')

router.get('/login', (req, res) =>{
    return res.send('OK')
})

router.post('/login', (req, res) => {
    User.findOne({
        where: { username: req.body.username }
    }).then(user =>{
        if (user) {
            bcrypt.compare(req.body.password, user.password).then( result => {
                if (result) {
                    const token = jwt.sign({
                        username: user.username
                    }, process.env.SECRET)

                    return res.json({token : token})
                } else {
                    console.log('Senhas não conferem')
                    return res.status(400).json({ err: 'Usuário e senha incorretos'})
                }
            })
        } else {
            console.log('Nao encontrou usuário com login')
            return res.status(404).json({ err: 'Usuário e senha incorretos'})
        }
    }).catch(err =>{
        return res.status(500).json({
            err: err
        })
    })
})

module.exports = router