const User = require("../models/user");
const bcrypt = require("bcrypt");
const router = require('express').Router()

const salt = 10;

router.post("/criar", (req, res) => {
  bcrypt.hash(req.body.password, salt, (err, hash) => {
    if (err) {
      console.log("Erro ao cifrar senha", err);
    } else {
      console.log("hash", hash);

      User.create({
        username: req.body.username,
        password: hash,
      })
        .then((user) => {
          return res.json({ msg: "Usuário cadastrado com sucesso" });
        })
        .catch((err) => {
          return res.status(500).json({ msg: err });
        });
    }
  });
});

module.exports = router