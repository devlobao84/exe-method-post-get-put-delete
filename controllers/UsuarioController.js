const fs = require ('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const { json } = require('express')



let usuarioJson = path.join("usuarios.json")
let UsuarioController = {
     registroForm: (req, res)=>{
          res.render('registroUsuario')
     },
     salvarForm:(req, res) => {
          console.log(req)
     let {nome, email, senha} = req.body 
     let {files} = req
     let senhaCrip = bcrypt.hashSync(senha, 10)
     let usuario = JSON.stringify({nome, email, senha:senhaCrip, avatar:files[0]})

     fs.writeFileSync(usuarioJson, usuario)
     res.send('usuario cadastrado com sucesso')
     
     }, 

     loginForm: (req, res)=>{
          res.render('login')
     },
     logarUsuario: (req, res)=>{
     let {email, senha} = req.body;
     let usuarioSalvo = fs.readFileSync(usuarioJson, {enconding: 'utf-8'});
     usuarioSalvo = JSON.parse(usuarioSalvo);
     
     if (email != usuarioSalvo.email){
          return res.send('Usuario inválido')
     }

     if(!bcrypt.compareSync(senha, usuarioSalvo.senha)){
          return res.send("Senha inválida")
     }
     res.redirect("/produtos")

}

}
module.exports = UsuarioController 