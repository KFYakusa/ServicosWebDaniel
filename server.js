const http = require('http')
const app = require('./app')

const port = process.env.PORT || 3000

const server = http.createServer(app)

server.listen(port)



// CRIAR ARQUIVO NODEMON.JSON COM O CODIGO:

// {
//     "env":{
//         "PORT": <numero da porta>
//     }
// }