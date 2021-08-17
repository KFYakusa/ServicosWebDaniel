const express =require('express')
const router = express.Router()

const ControlRole = require('../controllers/role')
const isAuth = require('../middleware/isAuth')

router.get('/all',isAuth, ControlRole.getRoles)
router.post('/:roleId',isAuth, ControlRole.createRole)
router.put('/:roleId',isAuth,ControlRole.editRole)
router.delete('/:roleId', isAuth, ControlRole.deleteRole)


module.exports=router