const express =require('express')
const router = express.Router()

const ControladorUsuario = require('../controllers/usuario')
const isAuth = require('../middleware/isAuth')

router.get('/all',ControladorUsuario.getALl)
router.post('/singup', ControladorUsuario.singUp)
router.post('/login',ControladorUsuario.Login)
router.delete('/', isAuth, ControladorUsuario.delete_user)
router.put('/',isAuth, ControladorUsuario.edit_user)

module.exports=router