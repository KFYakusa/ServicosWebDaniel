const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

const aula1Rotas = require('./api/routes/aula1')
const userRotas = require('./api/routes/usuario')

app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Accept, Authorization')
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

app.use('/aula1',aula1Rotas)
app.use('/user',userRotas)

app.use((req,res,next)=>{
    const error = new Error('Not found / Não encontrado')
    error.status = 404
    next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status||500)
    res.json({
        error:{
            message : error.message
        }
    })
})

module.exports = app