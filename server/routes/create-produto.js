const router = require('express').Router()
const Produtos = require('../models/produtos')

router.get("/", (req, res) => {
    Produtos.findAll()
      .then((produtos) => {
        if (produtos) {
          console.log("produtos", produtos);
          res.json(produtos);
        } else {
          console.log("Questões não encontradas");
          return res.status(400).json({
            err: "Questões não econtradas",
          });
        }
      })
      .catch((err) => {
        console.log("Erro", err);
        return res.json({ err: err });
      });
  });


router.post("/", (req, res) => {
    Produtos.create({
        item_name: req.body.item_name,
        preco: req.body.preco,
    })
    .then((produtos) => {
    return res.json({
        data: produtos,
    });
    })
    .catch((err) => {
    console.error(err);
    return res.status(500).json({
        err: err,
    });
    });
});

module.exports = router;