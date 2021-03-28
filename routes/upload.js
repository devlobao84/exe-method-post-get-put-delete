const express = require ('express');
const router = express.Router();

const uploadController = require('../controllers/UploadController')

/* GET user listing */ 

router.get('/arquivo', uploadController.registroForm);
router.post('/arquivo', uploadController.salvarForm);

router.get('/login', uploadController.loginForm);
router.post('/login', uploadController.logarUsuario);


module.exports = router 