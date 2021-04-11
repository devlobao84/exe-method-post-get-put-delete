const fs = require ('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const { json } = require('express')
const {check, validationResult, body} = require('express-validator')



let usuarioJson = path.join("usuarios.json")
let UsuarioController = {
     registroForm: (req, res)=>{
          res.render('registroUsuario')
     },
     salvarForm:(req, res) => {
     let listaDeErros = validationResult(req);

     if(listaDeErros.isEmpty()){
     let {nome, email, senha} = req.body 
     //Trabalhando com Multer Upload na linha 3, 17 e 19
     let {files} = req
     let senhaCrip = bcrypt.hashSync(senha, 10)
     //let usuario = JSON.stringify({nome, email, senha:senhaCrip, avatar:files[0]})
     let usuario = { nome, email, senha:senhaCrip, avatar: files[0]}
     const data = fs.readFileSync(usuarioJson, { encoding: 'utf-8' });
     const users = JSON.parse(data);
     users.push(usuario);
     const json = JSON.stringify(users);
     fs.writeFileSync(usuarioJson, json);
     res.send('usuario cadastrado com sucesso')
     return usuario

     }else{
          return res.render("registroUsuario", {errors: listaDeErros.errors})
     } 
     }, 


     //LÓGICA LOGAR USUSARIO 
     loginForm: (req, res)=>{
          res.render('login')
     },
     logarUsuario: (req, res)=>{
     let {email, senha, logado} = req.body;
     let usuarioSalvo = fs.readFileSync(usuarioJson, {enconding: 'utf-8'});
     usuarioSalvo = JSON.parse(usuarioSalvo);
     usuarioSalvo = usuarioSalvo.find(usuario => usuario.email == email)
     if (email != usuarioSalvo.email){
          return res.send('Usuario inválido')
     }
     if(!bcrypt.compareSync(senha, usuarioSalvo.senha)){
          return res.send("Senha inválida")
     }

     req.session.usuario = usuarioSalvo  
     
     if(logado != undefined){          
          res.cookie('logado', usuarioSalvo.email, {maxAge:60000})
     }
     res.redirect("/produtos")
     }
}
module.exports = UsuarioController 