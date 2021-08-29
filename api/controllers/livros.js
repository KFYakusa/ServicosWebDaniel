const { sql } = require('@databases/pg')
const { query } = require('express')
const { reset, restart } = require('nodemon')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const db = require('../../dbConfig')

exports.createLivro = (req, res, next) => {
  const { nome, autor, editora } = req.body

  if (!isValid(nome, autor, editora))
    res.status(406).json({ message: "error in input variables" })

  db.query(sql`INSERT INTO livros(book_name,book_author, book_publisher) VALUES(${nome},${autor},${editora})`)
    .then(result => res.status(201).json({ message: "created with success"}))
    .catch(error => res.status(500).json({ error }))
}
exports.editLivro = (req, res, next) => {
  const id = req.params.id
  const { nome, autor, editora } = req.body
  if (!isValid(nome, autor, editora)) {

    if (!isNaN(parseInt(id))) {
      db.query(sql`UPDATE livros SET 
          book_name=${nome}, 
          book_author=${autor},
          book_publisher=${editora} WHERE id=${id};`).then(result => {
        console.log(result)
        res.status(200).json(result)
      }).catch(error => {
        console.log(error);
        res.status(500).json(error)
      })
    }else 
      res.status(406).json({message:"ID not valid"})
  }else
    if (!isNaN(parseInt(id))) {
      db.query(sql`UPDATE * from livros SET ` + `
        if(nome!= null) book_name=${nome}, 
        book_author=${autor},
        book_publisher=${editora} WHERE id=${id};`).then(result=>{
          console.log(result);
          res.status(200).json(result)
        }).catch(error=>{
          console.log(error);
          res.status(500).json(error)
        })
    }else
      res.status(406).json({message:"ID not valid"})
  //have req.params
}
exports.deleteLivro = (req, res, next) => {
  const id = req.params.id
  if(isNaN(parseInt(id))){
    res.status(406).json({message:"ID not Valid"})
  }else{
    db.query(sql` DELETE FROM livros where id=${id};`).then(result=>{
      console.log(result);
      res.status(200).json(result)
    }).catch(error=>{
      console.log(error);
      res.status(500).json(error)
    })
  }
}
exports.getLivro = (req, res, next) => {
  const id = req.params.id
  if (!isNaN(parseInt(id))) {
    db.query(sql`SELECT * from livros where id=${id};`).then(result => {
      console.log(result)
      res.status(200).json(result)
    }).catch((error) => {
      console.log(error)
      res.status(500).json({message:" error getting "})
    })
  } else
    res.status()

}

exports.getAllLivros = (req, res, next) => {
  db.query(sql`SELECT * FROM livros;`)
    .then((resultado) => res.status(200).json(resultado))
}


isValid = (n, a, e) => {
  if (!n || !a || !e
    || !n.match(/^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.]+)$/)
    || !a.match(/^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.]+)$/)
    || !e.match(/^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.]+)$/)
  )
    return false
  return true
}
