const express = require('express')
const router = express.Router()

const Aula2Controller = require('../controllers/aula2')

router.post('/temperature', Aula2Controller.tempConverter)




module.exports = router