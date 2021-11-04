const express = require('express')
const cors = require('cors')


const login = require('./routes/login')
const createUser = require('./routes/create-user')
const createProduto = require('./routes/create-produto')
const createMercado = require('./routes/create-mercado')
const auth = require('./auth')

const app = express()

app.use(cors())
app.use(express.json())

//rotas
app.use(login)
app.use(createUser)
app.use(createMercado)
app.use("/mercados",createMercado)
app.use(createProduto)
app.use("/produtos",createProduto)


app.listen(5555, () => {
    console.log('servidor rodando caralho')
})