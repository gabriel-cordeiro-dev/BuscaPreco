const router = require('express').Router()
const Sequelize = require('sequelize')
const Produtos = require('../models/produtos')
const CarrinhoProdutos = require('../models/carrinho_produtos')
const MercadoProdutos = require('../models/mercado_produtos')
const Mercado = require('../models/mercado')
const Carrinho = require('../models/carrinho')
const { check, body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

function getUserIdFromTokem(req, res) {
    let token = req.headers['authorization']
    console.log("token: " + token)
    const tokenPuro = token.split(' ').pop()
    let userId

    jwt.verify(tokenPuro, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                err: 'Accesso negado'
            })
        }

        console.log('id user', decoded.id)
        userId = decoded.id
    })
    return userId
}

function calculateValorTotal(preco_produto, quantidade) {
    console.log("dentro da func calculate: " + preco_produto * quantidade)
    return preco_produto * quantidade
}

router.post("/", [
    check('id_mercado', "id_mercado é um campo obrigatório").trim().escape().notEmpty(),
    check('id_produtos', "id_produto é um campo obrigatório").trim().escape().notEmpty(),
    check('quantidade', "quantidade é um campo obrigatório").trim().escape().notEmpty()
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
            let userId = getUserIdFromTokem(req, res)

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

            const valor_total = calculateValorTotal(mercadoProduto.preco_produto, req.body.quantidade);
            console.log("valor_total: " + valor_total)

            const newCarrinho = await Carrinho.create({
                quantidade: req.body.quantidade,
                valor_total: valor_total,
                users_id: userId
            });
            console.log("carrinho: " + newCarrinho)

            const newCarrinhoProduto = await CarrinhoProdutos.create({
                carrinho_id: newCarrinho.id,
                produtos_id: req.body.id_produtos,
                quantidade: req.body.quantidade,
                mercado_id: mercado.id
            });
            console.log("carrinhoProduto: " + newCarrinhoProduto)

            res.json({
                msg: 'Carrinho salvo com sucesso!',
                carrinho: {
                    "id": newCarrinho.id,
                    "valor_total": valor_total
                }
            })
        }
    } catch (error) {
        console.log('ERROR:', error);
        return res.status(500).json({
            err: error
        });
    }

});

router.post("/:carrinho_id/adicionarProduto", [
    check('id_mercado', "id_mercado é um campo obrigatório").trim().escape().notEmpty(),
    check('id_produtos', "id_produto é um campo obrigatório").trim().escape().notEmpty(),
    check('quantidade', "quantidade é um campo obrigatório").trim().escape().notEmpty()
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
            let userId = getUserIdFromTokem(req, res)
            const { carrinho_id } = req.params

            const carrinho = await Carrinho.findOne({
                attributes: ['id', 'quantidade', 'valor_total'],
                where: {
                    id: carrinho_id
                }
            });
            console.log("carrinho: " + carrinho)

            if (!carrinho) {
                console.log("carrinho não foi encontrado");
                return res.status(400).json({
                    err: 'carrinho não foi encontrado'
                })
            }

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

            const carrinhoProdutos = await CarrinhoProdutos.findOne({
                attributes: ['carrinho_id', 'produtos_id'],
                where: {
                    carrinho_id: carrinho_id,
                    produtos_id: req.body.id_produtos
                }
            });
            console.log("carrinhoProdutos: " + carrinhoProdutos)

            if (carrinhoProdutos) {
                console.log("produto já inserido no carrinho");
                return res.status(400).json({
                    err: 'produto já inserido no carrinho'
                })
            }

            const valor_total = parseFloat(carrinho.valor_total) + parseFloat(calculateValorTotal(mercadoProduto.preco_produto, req.body.quantidade));
            console.log("valor_total fora da func: " + valor_total)
            const quantidadeProdutosNoCarrinho = Number(carrinho.quantidade) + Number(req.body.quantidade)

            console.log("carrinho antes" + carrinho)
            const updatedCarrinho = await carrinho.update({
                quantidade: quantidadeProdutosNoCarrinho,
                valor_total: valor_total
            });
            console.log("carrinho atualizado: " + updatedCarrinho)

            const newCarrinhoProduto = await CarrinhoProdutos.create({
                carrinho_id: carrinho.id,
                produtos_id: req.body.id_produtos,
                quantidade: req.body.quantidade,
                mercado_id: mercado.id
            });
            console.log("carrinhoProduto: " + newCarrinhoProduto)

            res.json({
                msg: 'Produto adicionado no carrinho com sucesso!',
                carrinho: {
                    "id": updatedCarrinho.id,
                    "quantidade": quantidadeProdutosNoCarrinho,
                    "valor_total": valor_total
                }
            })
        }
    } catch (error) {
        console.log('ERROR:', error);
        return res.status(500).json({
            err: error
        });
    }

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

router.get("/minhaLista", async (req, res) => {
    let userId = getUserIdFromTokem(req, res)

    const listaCarrinho = await Carrinho.findAll({
        where: { users_id: userId },
        attributes: ['id', 'quantidade', 'valor_total'],
        include: {
            model: CarrinhoProdutos,
            attributes: ['produtos_id', 'quantidade'],
            include: {
                model: Produtos,
                attributes: ['item_name']
            }
        }
    });

    if (!listaCarrinho) {
        console.log("carrinhos não encontrada");
        return res.status(400).json({
            err: 'carrinhos não encontrada'
        })
    }

    console.log("meu carrinho: " + listaCarrinho)
    res.json({ carrinhos: listaCarrinho });
});

router.get("/:carrinho_id", async (req, res) => {
    let userId = getUserIdFromTokem(req, res)
    const { carrinho_id } = req.params;

    const carrinho = await Carrinho.findOne({
        attributes: ['id', 'quantidade', 'valor_total'],
        where: {
            id: carrinho_id
        },
        include: {
            model: CarrinhoProdutos,
            attributes: ['produtos_id', 'quantidade', 'mercado_id'],
            include: {
                model: Produtos,
                attributes: ['item_name']
            }
        }
    });

    if (!carrinho) {
        console.log("carrinho não foi encontrado");
        return res.status(400).json({
            err: 'carrinho não foi encontrado'
        })
    }

    let obj = {
        id: carrinho.id,
        quantidade: carrinho.quantidade,
        valor_total: carrinho.valor_total,
        carrinho_has_produtos: []
    }

    carrinho.carrinho_has_produtos.forEach(lista => {
        let objOrder = {
            id_produto: lista.produtos_id,
            nome_produto: lista.produto.item_name,
            quantidade: lista.quantidade,
            id_mercado: lista.mercado_id
        }

        obj.carrinho_has_produtos.push(objOrder)
    })

    res.json(obj);
});

router.delete("/:carrinho_id", async (req, res) => {
    let userId = getUserIdFromTokem(req, res)

    await Carrinho.destroy({
        where: {
            id: req.params.carrinho_id
        }
    })

    res.json({ msg: 'carrinho deletado com sucesso' });
});


router.delete("/:carrinho_id/produtos/:produto_id", async (req, res) => {
    let userId = getUserIdFromTokem(req, res)

    await CarrinhoProdutos.destroy({
        where: {
            carrinho_id: req.params.carrinho_id,
            produtos_id: req.params.produto_id
        }
    })

    res.json({ msg: 'produto deletado do carrinho com sucesso' });
});

router.put("/:carrinho_id/produtos/:produto_id", [
    check('id_mercado', "id_mercado é um campo obrigatório").trim().escape().notEmpty(),
    check('quantidade', "quantidade é um campo obrigatório").trim().escape().notEmpty()
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
            let userId = getUserIdFromTokem(req, res)
            const { carrinho_id, produto_id } = req.params

            const carrinho = await Carrinho.findOne({
                attributes: ['id', 'quantidade', 'valor_total'],
                where: {
                    id: carrinho_id
                }
            });
            console.log("carrinho: " + carrinho)

            if (!carrinho) {
                console.log("carrinho não foi encontrado");
                return res.status(400).json({
                    err: 'carrinho não foi encontrado'
                })
            }

            const produto = await Produtos.findOne({
                where: { id: produto_id }
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
                    produtos_id: produto_id
                }
            });
            console.log("mercadoProduto: " + mercadoProduto)

            if (!mercadoProduto) {
                console.log("produto no mercado não foi encontrado");
                return res.status(400).json({
                    err: 'produto no mercado não foi encontrado'
                })
            }

            const carrinhoProduto = await CarrinhoProdutos.findOne({
                attributes: ['carrinho_id', 'produtos_id', 'quantidade'],
                where: {
                    carrinho_id: carrinho_id,
                    produtos_id: produto_id
                }
            });
            console.log("carrinhoProduto: " + carrinhoProduto)

            if (!carrinhoProduto) {
                console.log("carrinhoProduto não foi encontrado");
                return res.status(400).json({
                    err: 'carrinhoProduto não foi encontrado'
                })
            }

            const valor_total = parseFloat(carrinho.valor_total) + parseFloat(calculateValorTotal(mercadoProduto.preco_produto, req.body.quantidade));
            console.log("valor_total fora da func: " + valor_total)
            const quantidadeProdutosNoCarrinho = Number(carrinho.quantidade) + Number(req.body.quantidade)
            const quantidadeCarrinhoProduto = Number(carrinhoProduto.quantidade) + Number(req.body.quantidade)

            console.log("carrinho antes" + carrinho)
            const updatedCarrinho = await carrinho.update({
                quantidade: quantidadeProdutosNoCarrinho,
                valor_total: valor_total
            });
            console.log("carrinho atualizado: " + updatedCarrinho)

            const updatedCarrinhoProduto = await carrinhoProduto.update({
                carrinho_id: carrinho.id,
                produtos_id: produto_id,
                quantidade: quantidadeCarrinhoProduto
            });
            console.log("carrinhoProduto: " + updatedCarrinhoProduto)

            res.json({
                msg: 'Quantidade de um produto no carrinho atualizado com sucesso!',
                carrinho: {
                    "id": updatedCarrinho.id,
                    "quantidadeProdutosN": quantidadeProdutosNoCarrinho,
                    "valor_total": valor_total
                }
            })
        }
    } catch (error) {
        console.log('ERROR:', error);
        return res.status(500).json({
            err: error
        });
    }

});

module.exports = router;