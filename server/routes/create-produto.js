const router = require('express').Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Produtos = require('../models/produtos')

//buscar item pela busca inserida
router.get("/", (req, res) => {
    const { item_name } = req.query
    Produtos.findAll({
        where: {
            item_name:{
                [Op.like]: `${item_name}%`
            }
        }
    })
      .then((produtos) => {
        if (produtos) {
          console.log("produtos", produtos);
          res.json(produtos);
        } else {
          console.log("produtos não encontrados");
          return res.status(400).json({
            err: "Produtos não econtrados",
          });
        }
      })
      .catch((err) => {
        console.log("Erro", err);
        return res.json({ err: err.message });
      });
  });

// retorna todos os produtos
router.get("/allProdutos", (req, res) => {
    Produtos.findAll()
    .then((produtos) => {
    if (produtos) {
        console.log("produtos", produtos);
        res.json(produtos);
    } else {
        console.log("produtos não encontrados");
        return res.status(400).json({
        err: "Produtos não econtrados",
        });
    }
    })
    .catch((err) => {
    console.log("Erro", err);
    return res.json({ err: err.message });
    });
});

// cadastrar item no banco
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