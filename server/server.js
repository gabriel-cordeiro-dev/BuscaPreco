const express = require('express')
const cors = require('cors')


const login = require('./routes/login')
const createUser = require('./routes/create-user')
const createProduto = require('./routes/create-produto')
const createMercado = require('./routes/create-mercado')
const carrinho = require('./routes/create-carrinho')
const auth = require('./auth')

const app = express()

app.use(cors())
app.use(express.json())

//rotas
app.use(login)
app.use(createUser)
app.use(auth) // a partir daqui precisa do token de autenticacao
app.use(createMercado)
app.use("/mercado",createMercado)
app.use(createProduto)
app.use("/produtos",createProduto)
app.use("/carrinhos", carrinho)

const port = process.env.PORT || 5555
app.listen(port, () => {
    console.log('servidor rodando caralho')
})