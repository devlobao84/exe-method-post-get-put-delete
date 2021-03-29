const express = require ('express');
const router = express.Router();
const multer = require ('multer');
const path = require ('path');
const logDBMiddleware = require('../middlewares/logDB');


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
router.post('/criar', upload.any(), logDBMiddleware, usuarioController.salvarForm);

router.get('/login', usuarioController.loginForm);
router.post('/login', usuarioController.logarUsuario);


module.exports = router 

