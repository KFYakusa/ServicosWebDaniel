
exports.idadeCalculator = (req,res,next)=>{
    let msgRetorno = "BEM VINDO"
    let status = 200
    if(req.body.idade >= 65){ 
        msgRetorno += ", Acesso Preferencial, (todos os status deveriam ser 201 se eu estou criando)"
        status = 201
    }

    res.status(status).json({
        id: req.body.id,
        nome: req.body.nome,
        idade: req.body.idade,
        message: msgRetorno,
    })
}

exports.retornoDaniel = (req,res,next)=>{
    res.status(200).json({
        nome: "daniel"
    })
}


// exports.retornoNome = (req,res,next)=>{
    
//     res.status(200).json({entrada: req.params.nome})
// }
