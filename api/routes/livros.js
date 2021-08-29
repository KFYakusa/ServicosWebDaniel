const express =require('express')
const router = express.Router()

const ControladorLivros = require('../controllers/livros')
const isAuth = require('../middleware/isAuth')

router.get('/',isAuth, ControladorLivros.getAllLivros)
router.get('/:id',isAuth,ControladorLivros.getLivro)
router.post('/',isAuth,ControladorLivros.createLivro)
router.put('/:id',isAuth,ControladorLivros.editLivro)
router.delete('/:id',isAuth,ControladorLivros.deleteLivro)

module.exports=router