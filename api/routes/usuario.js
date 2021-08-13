const express =require('express')
const router = express.Router()

const ControladorUsuario = require('../controllers/usuario')

router.post('/singup', ControladorUsuario.singOn)
router.post('/login',ControladorUsuario.Login)
router.delete('/:userId', ControladorUsuario.delete_user)