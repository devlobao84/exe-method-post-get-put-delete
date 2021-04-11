const fs = require ('fs')
const express = require ('express');
const router = express.Router();
const multer = require ('multer');
const path = require ('path');
const logDBMiddleware = require('../middlewares/logDB');
const {check, validationResult, body} = require('express-validator')

// Lógica do Multer DiskStorage

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('uploads'))
  },
  filename: function (req, file, cb) {     
    cb(null, file.originalname)
  }
}) 
var upload = multer({ storage: storage })


//Trabalhando com o controle de Uploads de arquivos 
const usuarioController = require('../controllers/UsuarioController')

/* GET user listing */

// Aplicação de Middleware a nível de ROTA na linha 32 

router.get('/criar', logDBMiddleware, usuarioController.registroForm);
router.post('/criar', upload.any(), logDBMiddleware, [
  check("nome").isLength({min:5}).withMessage("Seu nome de usuario deve conter pelo menos 5 caracteres!"),
  check("email").isEmail().withMessage("Digite um e-mail válido!"), 
  check("senha").isLength({min:7}).withMessage("Sua senha precisa conter no mínimo 9 caracteres!"),
  body("email").custom((email)=>{
    let usuario = JSON.parse(fs.readFileSync('usuarios.json'))

    return usuario.email != email 
  }).withMessage("Este ususario já existe")


], usuarioController.salvarForm);

router.get('/login', usuarioController.loginForm);
router.post('/login', usuarioController.logarUsuario);


module.exports = router 

