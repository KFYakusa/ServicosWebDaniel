const express = require('express')
const router = express.Router()

const Aula1Controller = require('../controllers/aula1')

router.post('/pessoa', Aula1Controller.idadeCalculator)

router.get('/daniel', Aula1Controller.retornoDaniel)
// router.get('/:nome',Aula1Controller.retornoNome)


module.exports = router