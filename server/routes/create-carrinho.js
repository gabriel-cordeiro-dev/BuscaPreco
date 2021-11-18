const router = require('express').Router()
const Sequelize = require('sequelize')
const Produtos = require('../models/produtos')
const CarrinhoProdutos = require('../models/carrinho_produtos')
const MercadoProdutos = require('../models/mercado_produtos')
const Mercado = require('../models/mercado')
const Carrinho = require('../models/carrinho')

router.post("/:userId", async (req, res) => {
    const produto = await Produtos.findOne({
        where: { id: req.body.id_produtos }
    });

    if (!produto) {
        console.log("produto não encontrado");
        return res.status(400).json({
            err: 'Produto não encontrado'
        })
    }

    const mercado = await Mercado.findOne({
        attributes: ['id', 'mercado_nome'],
        where: { id: req.body.id_mercado }
    });

    if (!mercado) {
        console.log("mercado não encontrado");
        return res.status(400).json({
            err: 'Mercado não encontrado'
        })
    }

    const mercadoProduto = await MercadoProdutos.findOne({
        attributes: ['mercado_id', 'produtos_id', 'preco_produto'],
        where: {
            mercado_id: req.body.id_mercado,
            produtos_id: req.body.id_produtos
        }
    });
    console.log("mercadoProduto: " + mercadoProduto)

    if (!mercadoProduto) {
        console.log("produto no mercado não foi encontrado");
        return res.status(400).json({
            err: 'produto no mercado não foi encontrado'
        })
    }

    const valor_total = mercadoProduto.preco_produto * req.body.quantidade;
    console.log("valor_total: " + valor_total)

    const newCarrinho = await Carrinho.create({
        quantidade: req.body.quantidade,
        valor_total: valor_total,
        users_id: req.params.userId
    });
    console.log("carrinho: " + newCarrinho)

    const newCarrinhoProduto = await CarrinhoProdutos.create({
        carrinho_id: newCarrinho.id,
        produtos_id: req.body.id_produtos
    });
    console.log("carrinhoProduto: " + newCarrinhoProduto)

    res.json({
        msg: 'Carrinho salvo com sucesso!',
        carrinho: {
            "id": newCarrinho.id,
            "valor_total": valor_total
        }
    })

});

router.get("/list", async (req, res) => {
    const carrinhos = await Carrinho.findAll({
        attributes: ['id', 'quantidade', 'valor_total'],
        include: {
            model: CarrinhoProdutos,
            attributes: ['produtos_id'],
            include: {
                model: Produtos,
                attributes: ['item_name']
            }
        }
    });

    if (!carrinhos) {
        console.log("carrinhos não encontrada");
        return res.status(400).json({
            err: 'carrinhos não encontrada'
        })
    }

    res.json(carrinhos);
});

module.exports = router;