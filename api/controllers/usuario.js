const { sql } = require('@databases/pg')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../../dbConfig')

exports.singUp = (req, res, next) => {
    const {email, username, password, role} = req.body
   if(!isValid(email,username,password,role)){
       res.status(406).json({message: "dados faltando ou inválidos"})
   }

    db.query(sql`SELECT user_email from users WHERE user_email=${email};`).then((hasAlready)=>{
        if(hasAlready.length>=1){
            res.status(409).json({
                message: "email already exists / e-mail já existe"
            })
        }else{
            return bcrypt.hash(password,10, (err,hash)=>{
            
                if(err){
                    console.log("erro no Bcrypt");
                    res.status(500).json({error:err})
                }else{
                    console.log(hash);
                    return db.query(sql`INSERT INTO users(user_role,user_email,user_name,user_password) VALUES(${role},${email},${username},${hash}); SELECT id FROM users where user_email=${email}`).then((resultado)=>{
                        console.log(resultado);
                        const token = jwt.sign({
                            email:email,
                            userId:resultado,
                            role:role,
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "5h"
                        })
                        res.status(200).json({
                            message:" usuario criado",
                            token:token
                        })


                    }).catch((err)=>{
                        console.error(err.stack);
                        res.status(500).json({error:err})
                    })
                }        
            })
        }
    }).catch(err=>{
        console.error(err);
        res.status(500).json({err})
    })

}



exports.Login = (req, res, next) => {
    const {email, password} = req.body
    if(!email || !password){
        res.status(406).json({message:"dados faltando para update"})
    }

    if(!email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) 
        || !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/) ){
        res.status(406).json({message: "Dados inválidos"})
    }

    
    db.query(sql`SELECT user_email, user_password, role_name, u.id FROM users u INNER JOIN roles r ON user_role = r.id where user_email=${email} `).then((hasAlready)=>{
        if(hasAlready.length == 0){
            return res.status(401).json({
                message: "Authentication failed / autenticação falhou"
            })
        }

        bcrypt.compare(password, hasAlready[0].user_password).then(result=>{
            console.log(result);
            console.log(process.env.JWT_KEY);
            const token = jwt.sign({
                    email:hasAlready[0].user_email,
                    userId:hasAlready[0].id,
                    role:hasAlready[0].role_name,
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "5h"
                })
                return res.status(200).json({
                    message:" authenticação bem-sucedida",
                    token:token
                })
        }).catch(err=>{
            console.log(err);
            return res.status(500).json(err)
        })
    }).catch(err=>{
        console.error(err);
        res.status(500).json({err})
    })

}

exports.delete_user = (req, res, next) => {
    console.log(req.userData.userId);
    db.query(sql`DELETE FROM users WHERE id=${req.userData.userId}`).then(result=>{
        console.log(result);
        res.status(200).json({message:"conta excluída com sucesso"})
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err)
    })
}

exports.getALl = async (req, res, next) => {
    const resultado = await db.query(sql`SELECT * from users;`)
    res.status(200).json(resultado)
}

exports.edit_user = async (req,res,next)=>{
    const {email, username, password, role} = req.body

    if(!isValid(email,username,password,role)){
        res.status(406).json({message: "dados faltando ou inválidos"})
    }


    bcrypt.hash(password,10).then(hash=>{
        db.query(sql`UPDATE users SET user_email=${email}, user_name=${username}, user_password=${hash},user_role=${role} `).then(resultado=>{
            return res.status(200).json({message: "edição completa"})
        }).catch(err=>{
            console.log(err);
            return res.status(500).json(err)
        })    
    }).catch(err=>{
        console.log(err);
        res.status(400).json(err)
    })
    
}

const isValid = (e,u,p,r)=>{
    if( !e || !u || 
        !p || !r || 
        !e.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) || 
        !p.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/) || 
        !u.match( /^[a-zA-Z0-9_\.]+$/)){
        return false
    }
    return true
}