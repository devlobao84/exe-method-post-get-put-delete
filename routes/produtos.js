let express = require('express');
let router = express.Router();
const logPROMiddleware = require('../middlewares/logPROd');
let auth = require('../middlewares/auth'); 

let ProdutoController = require('../controllers/ProdutoController');

router.get('/criar', ProdutoController.viewForm);
router.post('/criar', logPROMiddleware, ProdutoController.salvarForm);
router.get('/sucesso', ProdutoController.sucesso);
router.get('/:id/editar', ProdutoController.viewAttForm);
router.put('/editar', ProdutoController.editar);
router.get('/', auth, ProdutoController.listarProdutos);
router.delete('/deletar/:id', ProdutoController.deletarProduto);

module.exports = router; 



