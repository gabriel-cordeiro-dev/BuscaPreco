const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { check, body, validationResult } = require('express-validator');

require('dotenv').config();

router.post('/login', [
    check('username', "Login é um campo obrigatório")
        .trim().escape().notEmpty(),
    check('password', "Senha é um campo obrigatório")
        .trim().escape().notEmpty()
], async (req, res) => {
    try {
        const erros = validationResult(req);

        const contextoErros = {
            erros: erros.array(),
        };

        console.log(erros);

        if (!erros.isEmpty() || contextoErros.erros.length > 0) {
            return res.status(422).json(contextoErros);
        } else {
            const user = await User.findOne({
                where: { username: req.body.username }
            });

            if (!user) {
                console.log("Não encontrou usuário com o login");
                return res.status(400).json({
                    err: 'Usuário/senha incorretos'
                })
            }

            const result = await bcrypt.compare(req.body.password, user.password);

            if (result) {
                const token = jwt.sign({
                    id: user.id,
                    username: user.username
                }, process.env.SECRET);

                console.log("token: ", token)
                return res.json({
                    token: token
                });
            } else {
                console.log("Não encontrou usuário com a senha");
                return res.status(400).json({
                    err: 'Usuário/senha incorretos'
                })
            }
        }
    } catch (error) {
        console.log('ERROR:', error);
        return res.status(500).json({
            err: error
        });
    }
});

module.exports = router;